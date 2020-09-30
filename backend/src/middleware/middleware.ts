import { MiddlewareFn } from 'type-graphql';
import { Context } from '../types/Context';
import admin from 'firebase-admin';
import knex from 'knex';
import { FieldNode } from 'graphql';
import _ from 'lodash';

export const reqWrapper: MiddlewareFn<Context> = async (
  { root, args, context, info },
  next
) => {
  try {
    // (IF
    if (info.fieldNodes.length !== 1)
      throw new Error('info.fieldNodes.length !== 1');
    if (
      info.fieldNodes[0].selectionSet === undefined ||
      info.fieldNodes[0].selectionSet === null
    )
      throw new Error('info.fieldNodes[0].selectionSet === undefined / null');

    const fieldNode = info.fieldNodes[0];
    const selections = info.fieldNodes[0].selectionSet.selections;
    for (let i = 0; i < selections.length; i++) {
      const selection = selections[i] as FieldNode;

      if (selection.name === undefined || selection.name === null)
        throw new Error('selection.name === undefined / null');

      if (selection.name.value === undefined || selection.name === null)
        throw new Error(
          `selection.name.value of ${i} fieldNode === undefined / null`
        );
    }
    // IF)

    // Connect to knex
    context.knexConnection = knex({
      client: 'pg',
      connection: {
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
      },
    });

    // Get clientId from idToken
    let uid = null;
    if (args.idToken === undefined || args.idToken === '') {
      context.clientId = 1;
    } else {
      let decodedIdToken: admin.auth.DecodedIdToken = await admin
        .auth()
        .verifyIdToken(args.idToken);
      uid = decodedIdToken.uid;

      console.log('@uid');
      console.log(uid);

      let data = await context
        .knexConnection('client')
        .select()
        .where('uid', uid);

      console.log('@clientData');
      console.log(data[0]);

      context.clientId = data[0].id;
    }

    // Create selectionSet
    context.selectionSet = [];
    for (let i = 0; i < selections.length; i++) {
      const selection = selections[i] as FieldNode;
      context.selectionSet.push(_.snakeCase(selection.name.value));
    }

    // Run the resolver
    const response = await next();

    // Disconnect from knex
    context.knexConnection
      .destroy()
      .then((res) => {
        console.log('@successfuly disconnected');
      })
      .catch((error) => {
        console.error('@unsuccessfuly disconnected');
      });

    return response;
  } catch (error) {
    return error;
  }
};
