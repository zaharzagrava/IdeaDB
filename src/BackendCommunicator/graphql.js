import * as firebase from 'firebase/app';
import { getKnowledgeFiles1 } from "../graphql/myqueries";
import { API, graphqlOperation } from 'aws-amplify';

export const loadKnowledgeFiles = async () => {
  console.log("@loadKnowledgeFiles")

  const idToken = await firebase.auth().currentUser.getIdToken();

  let response = null;
  
  try {
    // Default Search
    const response = await API.graphql(graphqlOperation(getKnowledgeFiles1, {
      regexList: ["."],
      orderByFields: ["LAST_DATE_TIME_MODIFIED", "DATE_TIME_CREATED"],
      orderByDirections: ["DESC", "DESC"],
      limit: 10,
      offset: 0,
      idToken: idToken
    }));

    console.log("@response")
    console.log(response)

    return response.data.getKnowledgeFiles;
  } catch (error) {
    console.log("@error")
    console.log(error)
  }

}