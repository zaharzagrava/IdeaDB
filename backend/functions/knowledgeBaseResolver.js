const { Client } = require('pg'); //  Needs the layer0 Lambda Layer
const knex = require('knex'); //  Needs the layer0 Lambda Layer
const _ = require('lodash');
const admin = require('firebase-admin');

const fs = require('fs');

exports.handler = async (event, context, callback) => {
  console.log('@start of knowledgeBaseResolver 1.0.0');
  console.log('@event');
  console.log(event);

  console.log('@connectToPostgreSQL with knex');
  const knexConnection = knex({
    client: 'pg',
    connection: {
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
    },
  });

  let firebaseApp = null;
  if (!admin.apps.length) {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  }

  let clientId = null;
  try {
    let uid = null;
    if (!event.arguments.idToken) {
      clientId = 1;
    } else {
      let data = await admin.auth().verifyIdToken(event.arguments.idToken);
      uid = data.uid;

      console.log('@uid');
      console.log(uid);

      data = await knexConnection('client').select().where('uid', uid);

      console.log('@clientData');
      console.log(data[0]);

      clientId = data[0].id;
    }
  } catch (error) {
    console.log('@error');
    console.log(error);
  }

  console.log('@clientId');
  console.log(clientId);

  let data = null;
  let response = {};

  const selectionSetList = [];
  event.info.selectionSetList.map((field) => {
    selectionSetList.push(`knowledge_file.${decamelize(field)}`);
  });

  console.log('@selectionSetList');
  console.log(selectionSetList);

  let args = camelCaseArgumentsToSnakeCaseObj(event.arguments);
  delete args['id_token'];
  let withTablePrefixArgs = addPrefixToKeys(args, 'knowledge_file.');

  switch (event.info.fieldName) {
    case 'getKnowledgeFile':
      console.log('@getKnowledgeFile field');

      data = await knexConnection('knowledge_file')
        .join(
          'client_knowledge_file',
          'knowledge_file.id',
          'client_knowledge_file.knowledge_file_id'
        )
        .select(selectionSetList)
        .where('knowledge_file.id', args.id);

      data = data[0];

      console.log('@data');
      console.log(data);

      // Rewriting underscored object data to camelCased object response
      event.info.selectionSetList.map((field, index) => {
        response[field] = data[_.snakeCase(field)];
      });

      break;

    case 'postKnowledgeFile':
      console.log('@postKnowledgeFile field');

      args['date_time_created'] = 'now()';
      args['last_date_time_modified'] = 'now()';

      data = await knexConnection('knowledge_file').insert(
        args,
        selectionSetList
      );

      data = data[0];

      console.log('@data');
      console.log(data);

      await knexConnection('client_knowledge_file').insert({
        client_id: clientId,
        knowledge_file_id: data.id,
      });

      // Rewriting underscored object data to camelCased object response
      event.info.selectionSetList.map((field, index) => {
        response[field] = data[_.snakeCase(field)];
      });

      break;

    case 'putKnowledgeFile':
      console.log('@putKnowledgeFile field');

      args['last_date_time_modified'] = 'now()';

      data = await knexConnection('knowledge_file')
        .join(
          'client_knowledge_file',
          'knowledge_file.id',
          'client_knowledge_file.knowledge_file_id'
        )
        .select(selectionSetList)
        .where('knowledge_file.id', args.id)
        .andWhere('client_knowledge_file.client_id', clientId);

      // if there is no such knowledge_file or it is not a property of this client
      if (!data[0]) {
        callback(`This file does not exist or is not your property.`);
        break;
      }

      data = await knexConnection('knowledge_file')
        .update(args, selectionSetList)
        .where('knowledge_file.id', args.id);

      data = data[0];

      console.log('@data');
      console.log(data);

      // Rewriting underscored object data to camelCased object response
      event.info.selectionSetList.map((field, index) => {
        response[field] = data[_.snakeCase(field)];
      });

      break;

    case 'deleteKnowledgeFile':
      console.log('@deleteKnowledgeFile field');

      data = await knexConnection('knowledge_file')
        .join(
          'client_knowledge_file',
          'knowledge_file.id',
          'client_knowledge_file.knowledge_file_id'
        )
        .select(selectionSetList)
        .where('knowledge_file.id', args.id)
        .andWhere('client_knowledge_file.client_id', clientId);

      // if there is no such knowledge_file or it is not a property of this client
      if (!data[0]) {
        callback(`This file does not exist or is not your property.`);
        break;
      }

      await knexConnection('knowledge_file')
        .del()
        .where('id', withTablePrefixArgs['knowledge_file.id']);

      data = data[0];

      console.log('@data');
      console.log(data);

      // Rewriting underscored object data to camelCased object response
      event.info.selectionSetList.map((field, index) => {
        response[field] = data[_.snakeCase(field)];
      });

      break;

    case 'getKnowledgeFiles':
      console.log('@getKnowledgeFiles field');

      if (args.order_by_fields.length !== args.order_by_directions.length) {
        callback(
          `orderByFields and orderByDirections arrays should be of one length`
        );
      }

      let query = knexConnection('knowledge_file');

      for (var i = 0; i < args.regex_list.length; i++) {
        const regex = args.regex_list[i];

        console.log('@regex');
        console.log(regex);

        if (i === 0) {
          query = query.where('knowledge_file.src_text', '~', regex);
        } else {
          query = query.andWhere('knowledge_file.src_text', '~', regex);
        }
      }

      query = query.andWhere('client_knowledge_file.client_id', clientId);

      const orderSettings = [];
      for (var i = 0; i < args.order_by_fields.length; i++) {
        orderSettings.push({
          column: _.snakeCase(args.order_by_fields[i]),
          order: args.order_by_directions[i],
        });
      }

      console.log('@orderSettings');
      console.log(orderSettings);

      data = await query
        .orderBy(orderSettings)
        .limit(withTablePrefixArgs.limit)
        .offset(withTablePrefixArgs.offset)
        .join(
          'client_knowledge_file',
          'knowledge_file.id',
          'client_knowledge_file.knowledge_file_id'
        )
        .select(selectionSetList);

      console.log('@data');
      console.log(data);

      // Rewriting underscored array data to camelCased array response
      response = [];
      for (let i = 0; i < data.length; i++) {
        response.push({});

        event.info.selectionSetList.map((field, index) => {
          response[i][field] = data[i][_.snakeCase(field)];
        });
      }

      break;

    default:
      callback(
        `There is no functionality to process this field: ${event.info.fieldName}`
      );
      break;
  }

  callback(null, response);

  console.log('@response');
  console.log(response);

  console.log('@disonnecting from PostgreSQL');
  knexConnection
    .destroy()
    .then((res) => {
      console.log('@successfuly disconnected');
      console.log(res);
    })
    .catch((error) => {
      console.error('@unsuccessfuly disconnected');
      console.log(error);
    });
};

function camelize(str) {
  var arr = str.split(/[_-]/);
  var newStr = '';
  for (var i = 1; i < arr.length; i++) {
    newStr += arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr[0] + newStr;
}

function decamelize(str) {
  return str
    .replace(/\.?([A-Z]+)/g, function (x, y) {
      return '_' + y.toLowerCase();
    })
    .replace(/^_/, '');
}

function camelCaseArgumentsToSnakeCaseObj(obj) {
  let underscoredObj = {};

  for (var argumentName in obj) {
    if (obj.hasOwnProperty(argumentName)) {
      const argumentValue = obj[argumentName];
      underscoredObj[`${decamelize(argumentName)}`] = argumentValue;
    }
  }

  console.log('@underscoredObj');
  console.log(underscoredObj);

  return underscoredObj;
}

function addPrefixToKeys(obj, prefix) {
  let prefixedObj = {};

  for (var argumentName in obj) {
    if (obj.hasOwnProperty(argumentName)) {
      const argumentValue = obj[argumentName];
      prefixedObj[`${prefix}${decamelize(argumentName)}`] = argumentValue;
    }
  }

  console.log('@obj');
  console.log(obj);

  return prefixedObj;
}
