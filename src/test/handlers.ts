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
    if (req.body === undefined || req.body.variables === undefined)
      throw new Error(
        'req.body === undefined || req.body.variables !== undefined'
      );

    // Create new Knowledge File and add it to JSON database
    const newId = knowledgeFiles[knowledgeFiles.length - 1].id + 1;
    const newKnowledgeFile: KnowledgeFile = {
      id: newId,
      srcText: `This is a source of the knowledge file under #${newId}
      - One data
      - Two data
      - Three data`,
      dateTimeCreated:
        knowledgeFiles[knowledgeFiles[knowledgeFiles.length - 1].id]
          .dateTimeCreated,
      lastDateTimeModified:
        knowledgeFiles[knowledgeFiles[knowledgeFiles.length - 1].id]
          .lastDateTimeModified,
      wordCount:
        knowledgeFiles[knowledgeFiles[knowledgeFiles.length - 1].id].wordCount,
    };
    knowledgeFiles.push(newKnowledgeFile);

    return res(
      ctx.data({
        putKnowledgeFile: newKnowledgeFile,
      })
    );
  }),

  graphql.mutation('PutKnowledgeFile', (req, res, ctx) => {
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

  rest.get('someotherurl.com', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        stuff: 15,
      })
    );
  }),

  // rest.get('*', async (req, res, ctx) => {
  //   console.log('@WHHAAT?');
  //   const data = await axios({
  //     ...req,
  //     url: req.url.toString(),
  //     method: convertStringToLiteral(req.method, [
  //       'link',
  //       'get',
  //       'GET',
  //       'delete',
  //       'DELETE',
  //       'HEAD',
  //       'options',
  //       'OPTIONS',
  //       'post',
  //       'POST',
  //       'put',
  //       'PUT',
  //       'patch',
  //       'PATCH',
  //       'purge',
  //       'PURGE',
  //       'LINK',
  //       'unlink',
  //       'UNLINK'
  //     ]) as any,
  //   });
  //   return res(ctx.status(data.status), ctx.body(data.data));
  // }),
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
