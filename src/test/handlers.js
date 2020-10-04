"use strict";
exports.__esModule = true;
exports.handlers = void 0;
var msw_1 = require("msw");
var mockData_1 = require("./mockData");
exports.handlers = [
    // Handles a "Login" mutation
    msw_1.graphql.query('GetKnowledgeFile', function (req, res, ctx) {
        console.log('@GetKnowledgeFiles');
        return res(ctx.data({
            getKnowledgeFiles: mockData_1.knowledgeFiles[0]
        }));
    }),
    // Handles a "Login" mutation
    msw_1.graphql.query('GetKnowledgeFiles', function (req, res, ctx) {
        console.log('@GetKnowledgeFiles');
        return res(ctx.data({
            getKnowledgeFiles: [
                mockData_1.knowledgeFiles[0],
                mockData_1.knowledgeFiles[1],
                mockData_1.knowledgeFiles[2],
            ]
        }));
    }),
    msw_1.graphql.mutation('PutKnowledgeFile', function (req, res, ctx) {
        console.log('@PutKnowledgeFile');
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
];
