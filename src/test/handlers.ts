import { graphql } from 'msw';
import { knowledgeFiles } from './mockData';
import { KnowledgeFile } from '../types/types';

export const handlers = [
  // Handles a "Login" mutation
  graphql.query('GetKnowledgeFile', (req, res, ctx) => {
    console.log('@GetKnowledgeFiles');
    return res(
      ctx.data({
        getKnowledgeFiles: knowledgeFiles[0],
      })
    );
  }),
  // Handles a "Login" mutation
  graphql.query('GetKnowledgeFiles', (req, res, ctx) => {
    console.log('@GetKnowledgeFiles');
    return res(
      ctx.data({
        getKnowledgeFiles: [
          knowledgeFiles[0],
          knowledgeFiles[1],
          knowledgeFiles[2],
        ],
      })
    );
  }),

  graphql.mutation('PutKnowledgeFile', (req, res, ctx) => {
    console.log('@PutKnowledgeFile');
    if (req.body === undefined || req.body.variables === undefined)
      throw new Error(
        'req.body === undefined || req.body.variables !== undefined'
      );

    const responseData: KnowledgeFile = {
      id: req.body.variables.id,
      srcText: req.body.variables.srcText,
      dateTimeCreated: knowledgeFiles[0].dateTimeCreated,
      lastDateTimeModified: knowledgeFiles[0].lastDateTimeModified,
      wordCount: knowledgeFiles[0].wordCount,
    };

    return res(
      ctx.data({
        putKnowledgeFile: responseData,
      })
    );
  }),
];
