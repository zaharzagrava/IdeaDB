import React from 'react';
import {
  loadKnowledgeFiles,
  putKnowledgeFile,
  deleteKnowledgeFile,
} from './graphql';
import { server, graphql } from '../test/setupServer';
test.only('renders learn react link', async () => {
  const response = await loadKnowledgeFiles(
    ['.'],
    ['LAST_DATE_TIME_MODIFIED', 'DATE_TIME_CREATED'],
    ['DESC', 'DESC'],
    10,
    0
  );

  expect(response).toEqual({
    user: {
      firstName: 'John',
      lastName: 'Maverick',
    },
  });
});
