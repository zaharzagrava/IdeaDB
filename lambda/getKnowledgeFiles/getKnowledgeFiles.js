

exports.handler = async function (event, context, callback) {
  console.log("Event: " + event);
  return formatResponse("This is a test message from ZZ!")
}

var formatResponse = function(body){
  var response = {
    "statusCode": 200,
    "headers": {
      "Content-Type": "application/json"
    },
    "isBase64Encoded": false,
    "multiValueHeaders": { 
      "X-Custom-Header": ["My value", "My other value"],
    },
    "body": body
  }
  return response
}
