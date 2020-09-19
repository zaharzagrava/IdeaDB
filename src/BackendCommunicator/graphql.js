import { firebase } from './firebase';
import { getKnowledgeFiles1 } from '../graphql/myqueries';
import { API, graphqlOperation } from 'aws-amplify';
import {
  putKnowledgeFile as putKnowledgeFile0,
  deleteKnowledgeFile as deleteKnowledgeFile0,
  postKnowledgeFile as postKnowledgeFile0,
} from '../graphql/mutations';
import { Error1, processError } from '../util/util';

export const loadKnowledgeFiles = async (
  regexList,
  orderByFields,
  orderByDirections,
  limit,
  offset
) => {
  try {
    console.log('@1');
    const idToken = await firebase.auth().currentUser.getIdToken();
    console.log('@2');

    const response = await API.graphql(
      graphqlOperation(getKnowledgeFiles1, {
        regexList: regexList,
        orderByFields: orderByFields,
        orderByDirections: orderByDirections,
        limit: limit,
        offset: offset,
        idToken: idToken,
      })
    );

    return response.data.getKnowledgeFiles;
  } catch (error) {
    processError(error, 'src/BackendCommunicator/loadKnowledgeFiles');
  }
};

export const putKnowledgeFile = async (knowledgeFile, srcText) => {
  try {
    const idToken = await firebase.auth().currentUser.getIdToken();
    const response = await API.graphql(
      graphqlOperation(putKnowledgeFile0, {
        id: knowledgeFile.id,
        srcText: srcText,
        idToken: idToken,
      })
    );

    // console.log('@response');
    // console.log(response);
  } catch (error) {
    // console.log('@error');
    console.log(error);
  }
};

export const deleteKnowledgeFile = async (knowledgeFile) => {
  try {
    const idToken = await firebase.auth().currentUser.getIdToken();

    await API.graphql(
      graphqlOperation(deleteKnowledgeFile0, {
        id: knowledgeFile.id,
        idToken: idToken,
      })
    );

    return knowledgeFile;
  } catch (error) {
    throw new Error1(error.message);
  }
};

export const postKnowledgeFile = async () => {
  try {
    const idToken = await firebase.auth().currentUser.getIdToken();

    let response = null;
    response = await API.graphql(
      graphqlOperation(postKnowledgeFile0, {
        idToken: idToken,
      })
    );

    return response.data.postKnowledgeFile;
  } catch (error) {
    processError(error, 'src/BackendCommunicator/postKnowledgeFile');
  }
};
