import 'reflect-metadata';
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import { buildSchema, registerEnumType } from 'type-graphql';

import {
  KnowledgeFileResolver,
  Direction,
  KnowledgeFileFields,
} from './resolvers';
import admin from 'firebase-admin';
import { Context } from './types/Context';
import dotenv from 'dotenv';
dotenv.config();

const main = async () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  }

  registerEnumType(Direction, {
    name: 'Direction',
    description: 'Directions of the KnowledgeFile List result ordering',
  });

  registerEnumType(KnowledgeFileFields, {
    name: 'KnowledgeFileFields',
    description: 'Fields of the KnowledgeFile List result ordering',
  });

  const schema = await buildSchema({
    resolvers: [KnowledgeFileResolver],
  });
  const apolloServer = new ApolloServer({
    schema,
    context: (ctx: Context) => ctx,
  });

  const expressServer: Application = express();
  expressServer.use('*', cors());
  expressServer.use(compression());

  apolloServer.applyMiddleware({ app: expressServer, path: '/graphql' });

  expressServer.listen(process.env.port || 4000, () => {
    console.log(
      `Express server is listening on port ${
        process.env.port || 4000
      }, on path /graphql`
    );
  });
};

main();
