const { Client } = require('pg'); //  Needs the layer0 Lambda Layer
const knex = require('knex');     //  Needs the layer0 Lambda Layer

exports.handler = async (event, context, callback) => {
  console.log('@start of knowledgeBaseResolver');
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
    return null;
  })
  
  console.log('@underscoredSelectionSetList')
  console.log(underscoredSelectionSetList)
  
  const underscoredArguments = {};
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
                    .where('id', event.arguments.id);
                    
      data = data[0];
      
      console.log('@data');
      console.log(data);
      
      event.info.selectionSetList.map((field, index) => {
        response[field] = data[underscoredSelectionSetList[index]];
        return null;
      });
      
      console.log('@response');
      console.log(response);
      
      callback(null, response)
      break;
      
    case "postKnowledgeFile":
      console.log('@postKnowledgeFile field');
      
      data = await knexConnection('knowledge_file')
                    .insert(underscoredArguments, underscoredSelectionSetList);
      
      console.log('@data');
      console.log(data);
      
      event.info.selectionSetList.map((field, index) => {
        response[field] = data[underscoredSelectionSetList[index]];
      });
      
      console.log('@response');
      console.log(response);
      
      callback(null, response)
      break;
  
    default:
      callback(`There is no functionality to process this field: ${event.info.fieldName}`);
      break;
  }
  
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