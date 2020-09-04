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


console.log(camelize("full_name"))

console.log(camelize("html_text"))
console.log(camelize("plain_text"))
console.log(camelize("properties"))
console.log(camelize("last_date_time_modified"))
console.log(camelize("date_time_created"))
console.log(camelize("word_count"))

console.log(camelize("client_id"))
console.log(camelize("knowledge_file_id"))

console.log("---------------------------")

console.log(decamelize("fullName"))

console.log(decamelize("htmlText"))
console.log(decamelize("plainText"))
console.log(decamelize("properties"))
console.log(decamelize("lastDateTimeModified"))
console.log(decamelize("dateTimeCreated"))
console.log(decamelize("wordCount"))

console.log(decamelize("clientId"))
console.log(decamelize("knowledgeFileId"))