import {
  loadKnowledgeFiles,
  putKnowledgeFile,
  deleteKnowledgeFile,
} from './graphql';
import { server, graphql } from '../test/setupServer';
import { firebase } from './firebase';

jest.mock('./firebase');

test('loadKnowledgeFiles', async () => {
  try {
    const response = await loadKnowledgeFiles(
      ['.'],
      ['LAST_DATE_TIME_MODIFIED', 'DATE_TIME_CREATED'],
      ['DESC', 'DESC'],
      10,
      0
    );
  } catch (error) {}

  // expect(response).toEqual({
  //   user: {
  //     firstName: 'John',
  //     lastName: 'Maverick',
  //   },
  // });
  expect(firebase.auth().currentUser.getIdToken).toHaveBeenCalled();
});
