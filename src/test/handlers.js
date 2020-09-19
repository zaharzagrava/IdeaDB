import { graphql } from 'msw';

export const handlers = [
  graphql.query('GetKnowledgeFiles', (req, res, ctx) => {
    return res(
      ctx.data({
        getKnowledgeFiles: {
          user: {
            firstName: 'John',
            lastName: 'Maverick',
          },
        },
      })
    );
  }),
];
