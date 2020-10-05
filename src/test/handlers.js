'use strict';
exports.__esModule = true;
exports.handlers = void 0;
var msw_1 = require('msw');
var mockData_1 = require('./mockData');
exports.handlers = [
  msw_1.graphql.query('GetKnowledgeFiles', function (req, res, ctx) {
    return res(
      ctx.data({
        getKnowledgeFiles: [
          mockData_1.knowledgeFiles[0],
          mockData_1.knowledgeFiles[1],
          mockData_1.knowledgeFiles[2],
        ],
      })
    );
  }),
  msw_1.graphql.query('GetKnowledgeFile', function (req, res, ctx) {
    return res(
      ctx.data({
        getKnowledgeFile: mockData_1.knowledgeFiles[0],
      })
    );
  }),
  msw_1.graphql.mutation('PostKnowledgeFile', function (req, res, ctx) {
    return res(
      ctx.data({
        postKnowledgeFile: mockData_1.knowledgeFiles[0],
      })
    );
  }),
  msw_1.graphql.mutation('PutKnowledgeFile', function (req, res, ctx) {
    return res(
      ctx.data({
        putKnowledgeFile: mockData_1.knowledgeFiles[0],
      })
    );
  }),
  msw_1.graphql.mutation('DeleteKnowledgeFile', function (req, res, ctx) {
    return res(
      ctx.data({
        deleteKnowledgeFile: mockData_1.knowledgeFiles[0],
      })
    );
  }),
  msw_1.rest.get('someotherurl.com', function (req, res, ctx) {
    return res(
      ctx.status(200),
      ctx.json({
        stuff: 15,
      })
    );
  }),
];
