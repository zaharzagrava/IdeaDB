const { Client } = require('pg'); //  Needs the layer0 Lambda Layer
const knex = require('knex');     //  Needs the layer0 Lambda Layer
const _ = require('lodash');

exports.handler = async (event, context, callback) => {
  console.log('@start of knowledgeBaseResolver 1.0.0');
  console.log('@event');
  console.log(event)

  console.log('@connectToPostgreSQL with knex');
  const knexConnection = knex({
    client: 'pg',
    connection: {
      host: process.env.PGHOST,
      user : process.env.PGUSER,
      password : process.env.PGPASSWORD,
      database : process.env.PGDATABASE	
    }
  });
  
  let data = null;
  let response = {};
  
  const underscoredSelectionSetList = [];
  event.info.selectionSetList.map((field) => {
    underscoredSelectionSetList.push(decamelize(field));
  })
  
  console.log('@underscoredSelectionSetList')
  console.log(underscoredSelectionSetList)
  
  let underscoredArguments = {}
  
  for (var argumentName in event.arguments) {
    if (event.arguments.hasOwnProperty(argumentName)) {
      const argumentValue = event.arguments[argumentName];
      underscoredArguments[decamelize(argumentName)] = argumentValue;
    }
  }
  
  console.log('@underscoredArguments')
  console.log(underscoredArguments)
  
  switch (event.info.fieldName) {
    case "getKnowledgeFile":
      console.log('@getKnowledgeFile field');
      
      data = await knexConnection('knowledge_file')
              .select(underscoredSelectionSetList)
              .where('id', underscoredArguments.id);
      
      data = data[0];
  
      console.log('@data');
      console.log(data);
      
      // Rewriting underscored object data to camelCased object response
      event.info.selectionSetList.map((field, index) => {
        response[field] = data[underscoredSelectionSetList[index]];
      });
      
      break;
      
    case "postKnowledgeFile":
      console.log('@postKnowledgeFile field');
      
      underscoredArguments["date_time_created"] = "now()";
      underscoredArguments["last_date_time_modified"] = "now()";
      
      data = await knexConnection('knowledge_file')
              .insert(underscoredArguments, underscoredSelectionSetList);
              
      data = data[0];
  
      console.log('@data');
      console.log(data);
      
      // Rewriting underscored object data to camelCased object response
      event.info.selectionSetList.map((field, index) => {
        response[field] = data[underscoredSelectionSetList[index]];
      });
      
      break;
      
    case "putKnowledgeFile":
      console.log('@putKnowledgeFile field');
      
      underscoredArguments["last_date_time_modified"] = "now()";
      
      data = await knexConnection('knowledge_file')
              .update(underscoredArguments, underscoredSelectionSetList)
              .where('id', underscoredArguments.id);
      
      data = data[0];
  
      console.log('@data');
      console.log(data);
      
      // Rewriting underscored object data to camelCased object response
      event.info.selectionSetList.map((field, index) => {
        response[field] = data[underscoredSelectionSetList[index]];
      });
      
      break;
      
    case "deleteKnowledgeFile":
      console.log('@deleteKnowledgeFile field');
      
      data = await knexConnection('knowledge_file')
              .select(underscoredSelectionSetList)
              .where('id', underscoredArguments.id);
      
      await knexConnection('knowledge_file')
              .del()
              .where('id', underscoredArguments.id);
      
      data = data[0];
  
      console.log('@data');
      console.log(data);
      
      // Rewriting underscored object data to camelCased object response
      event.info.selectionSetList.map((field, index) => {
        response[field] = data[underscoredSelectionSetList[index]];
      });
      
      break;
      
    case "getKnowledgeFiles":
      console.log('@getKnowledgeFiles field');
      
      if(underscoredArguments.order_by_fields.length !==
         underscoredArguments.order_by_directions.length) {
        callback(`orderByFields and orderByDirections arrays should be of one length`);
      }
      
      let query = knexConnection('knowledge_file');
      
      console.log("typeof underscoredArguments.properties")
      console.log(typeof underscoredArguments.properties)
      
      if(underscoredArguments.properties !== null &&
         underscoredArguments.properties !== undefined) {
        query = query.whereRaw('knowledge_file.properties @> ?::jsonb', [underscoredArguments.properties]);
      }
      
      if(underscoredArguments.plain_text !== null &&
         underscoredArguments.properties !== undefined) {
        query = query.where(`plain_text`, 'like', `%${underscoredArguments.plain_text}%`);
      }
      
      const orderSettings = []
      for (var i = 0; i < underscoredArguments.order_by_fields.length; i++) {
        underscoredArguments.order_by_fields[i];
        orderSettings.push({
          column: _.snakeCase(underscoredArguments.order_by_fields[i]),
          order: underscoredArguments.order_by_directions[i]
        })
      }
      
      console.log('@orderSettings');
      console.log(orderSettings);
      
      data = await query.orderBy(orderSettings)
                        .limit(underscoredArguments.limit)
                        .offset(underscoredArguments.offset)
                        .select(underscoredSelectionSetList);
      
      console.log('@data');
      console.log(data);
      
      // Rewriting underscored array data to camelCased array response
      response = [];
      for (let i = 0; i < data.length; i++) {
        const knowledgeFile = data[i];
        
        response.push({});
        
        event.info.selectionSetList.map((field, index) => {
          response[i][field] = knowledgeFile[underscoredSelectionSetList[index]];
        });
      }
      
      break;
  
    default:
      callback(`There is no functionality to process this field: ${event.info.fieldName}`);
      break;
  }
  
  callback(null, response)
      
  console.log('@response');
  console.log(response);
  
  console.log('@disonnecting from PostgreSQL');
  knexConnection.destroy()
    .then((res) => {
      console.log("@successfuly disconnected");
      console.log(res);
    })
    .catch((error) => {
      console.error("@unsuccessfuly disconnected");
      console.log(error);
    })
};

function camelize(str) {
  var arr = str.split(/[_-]/);
  var newStr = "";
  for (var i = 1; i < arr.length; i++) {
      newStr += arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr[0] + newStr;
}

function decamelize(str) {
  return str.replace(/\.?([A-Z]+)/g, function (x,y){return "_" + y.toLowerCase()}).replace(/^_/, "");
}