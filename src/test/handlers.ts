import { graphql, rest } from 'msw';
import { knowledgeFiles } from './mockData';
import { GetKnowledgeFileArgs, KnowledgeFile } from '../types/types';
import axios from 'axios';

export const handlers = [
  graphql.query<{ getKnowledgeFiles: KnowledgeFile[] }, GetKnowledgeFileArgs>(
    'GetKnowledgeFiles',
    (req, res, ctx) => {
      return res(
        ctx.data({
          getKnowledgeFiles: [
            knowledgeFiles[0],
            knowledgeFiles[1],
            knowledgeFiles[2],
          ],
        })
      );
    }
  ),

  graphql.query<{ getKnowledgeFile: KnowledgeFile }, GetKnowledgeFileArgs>(
    'GetKnowledgeFile',
    (req, res, ctx) => {
      return res(
        ctx.data({
          getKnowledgeFile: knowledgeFiles[0],
        })
      );
    }
  ),

  graphql.mutation('PostKnowledgeFile', (req, res, ctx) => {
    return res(
      ctx.data({
        postKnowledgeFile: knowledgeFiles[0],
      })
    );
  }),

  graphql.mutation('PutKnowledgeFile', (req, res, ctx) => {
    return res(
      ctx.data({
        putKnowledgeFile: knowledgeFiles[0],
      })
    );
  }),

  graphql.mutation('DeleteKnowledgeFile', (req, res, ctx) => {
    return res(
      ctx.data({
        deleteKnowledgeFile: knowledgeFiles[0],
      })
    );
  }),

  rest.get('someotherurl.com', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        stuff: 15,
      })
    );
  }),
];
