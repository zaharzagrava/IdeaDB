"use strict";
exports.__esModule = true;
exports.handlers = void 0;
var msw_1 = require("msw");
var mockData_1 = require("./mockData");
exports.handlers = [
    msw_1.graphql.query('GetKnowledgeFiles', function (req, res, ctx) {
        return res(ctx.data({
            getKnowledgeFiles: [
                mockData_1.knowledgeFiles[0],
                mockData_1.knowledgeFiles[1],
                mockData_1.knowledgeFiles[2],
            ]
        }));
    }),
    msw_1.graphql.query('GetKnowledgeFile', function (req, res, ctx) {
        return res(ctx.data({
            getKnowledgeFile: mockData_1.knowledgeFiles[0]
        }));
    }),
    msw_1.graphql.mutation('PostKnowledgeFile', function (req, res, ctx) {
        if (req.body === undefined || req.body.variables === undefined)
            throw new Error('req.body === undefined || req.body.variables !== undefined');
        // Create new Knowledge File and add it to JSON database
        var newId = mockData_1.knowledgeFiles[mockData_1.knowledgeFiles.length - 1].id + 1;
        var newKnowledgeFile = {
            id: newId,
            srcText: "This is a source of the knowledge file under #" + newId + "\n      - One data\n      - Two data\n      - Three data",
            dateTimeCreated: mockData_1.knowledgeFiles[mockData_1.knowledgeFiles[mockData_1.knowledgeFiles.length - 1].id]
                .dateTimeCreated,
            lastDateTimeModified: mockData_1.knowledgeFiles[mockData_1.knowledgeFiles[mockData_1.knowledgeFiles.length - 1].id]
                .lastDateTimeModified,
            wordCount: mockData_1.knowledgeFiles[mockData_1.knowledgeFiles[mockData_1.knowledgeFiles.length - 1].id].wordCount
        };
        mockData_1.knowledgeFiles.push(newKnowledgeFile);
        return res(ctx.data({
            putKnowledgeFile: newKnowledgeFile
        }));
    }),
    msw_1.graphql.mutation('PutKnowledgeFile', function (req, res, ctx) {
        if (req.body === undefined || req.body.variables === undefined)
            throw new Error('req.body === undefined || req.body.variables !== undefined');
        var responseData = {
            id: req.body.variables.id,
            srcText: req.body.variables.srcText,
            dateTimeCreated: mockData_1.knowledgeFiles[0].dateTimeCreated,
            lastDateTimeModified: mockData_1.knowledgeFiles[0].lastDateTimeModified,
            wordCount: mockData_1.knowledgeFiles[0].wordCount
        };
        return res(ctx.data({
            putKnowledgeFile: responseData
        }));
    }),
    msw_1.rest.get('someotherurl.com', function (req, res, ctx) {
        return res(ctx.status(200), ctx.json({
            stuff: 15
        }));
    }),
];
// function convertStringToLiteral(
//   method: string,
//   literalList:string[]
// ) {
//   for (let i = 0; i < literalList.length; i++) {
//     const lmethod = literalList[i];
//     if (method === lmethod) {
//       return method as typeof lmethod;
//     }
//   }
//   throw new Error('No method is compatible');
// }
