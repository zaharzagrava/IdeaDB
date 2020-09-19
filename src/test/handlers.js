import { graphql } from 'msw';

export const handlers = [
  graphql.query('GetKnowledgeFiles', (req, res, ctx) => {
    console.log('~!!!!!!!!!!!!!!!!!!!!!!!~');
    return res(
      ctx.data({
        user: {
          firstName: 'John',
          lastName: 'Maverick',
        },
      })
    );
  }),
];
