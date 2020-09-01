const { Client } = require('pg');  //  Needs the layer0 Lambda Layer

exports.handler = async (event, context, callback) => {
  const client = new Client();
  await client.connect();
  
  console.log(`-------------------------------`)
  console.log(event)
  
  const queryStringParameters = event['queryStringParameters'];
  
  let query = `select *
from knowledge_file`;
  let values = [];
  
  if(queryStringParameters !== null) {
    if(queryStringParameters['properties'] !== undefined) {
      console.log('@properties')
      query += `
where (knowledge_file.properties @> $1::jsonb)`
      values.push(queryStringParameters['properties'])
    }
    
    if(queryStringParameters['searchBarText'] !== undefined) {
      console.log('@searchBarText')
      query += `
and (knowledge_file.plain_text LIKE $2)`
      values.push('%' + queryStringParameters['searchBarText'] +'%')
    }
  }
  
  console.log('@query');
  console.log(query);
  console.log(`-------------------------------`)
  
  let res = null;
  try {
    res = await client.query(query, values);
  } catch(error) {
    console.log("@client.query");
    console.log(error);
  }

  console.log('@res.rows');
  console.log(res.rows);
  
  try {
    await client.end();
  } catch(error) {
    console.log("@client.end");
    console.log(error);
  }
  
  const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Credentials": 'true',
        "Access-Control-Allow-Methods": 'DELETE,GET,OPTIONS,POST,PUT'
      },
      body: JSON.stringify(res.rows)
  };
  
  console.log(response)
  
  return response;
};



///////////////////////////////////////////////////////

// async function connectToPostgreSQL() {
//   let client = null;

//   try {
//     client = new Client();
//     await client.connect();
//   } catch(error) {
//     console.log("@connectToPostgreSQL");
//     console.log(error);
//   }


//   return client;
// }

// async function disconnectFromPostgreSQL(client) {
//   const client = new Client();
//   await client.connect();
// }

// async function sendQueryToPostgreSQL(client, query, values) {
//   let response = null;

//   try {
//     response = await client.query(query, values);
//   } catch(error) {
//     console.log("@client.query");
//     console.log(error);
//   }

//   return response;
// }