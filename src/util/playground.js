// const queryStringParameters = {
//   "searchBarText": "fundamental",
//   "properties": {
//       "identifier": ["tree"],
//       "discipline": ["biology"]
//   }
// };


// // console.log(`select *
// // from knowledge_file
// // where (knowledge_file.properties @> '${JSON.stringify(queryStringParameters.properties)}'::jsonb)
// //   and (knowledge_file.plain_text LIKE '%${queryStringParameters.searchBarText}%')`);

// const properties_stringified = JSON.stringify(queryStringParameters.properties);

// console.log("@properties_stringified")
// console.log(properties_stringified)