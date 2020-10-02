import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import { Error1, processError } from '../utils/utils';

const firebaseConfig = {
  apiKey: 'AIzaSyDRzS7x4Y1pOHEe-nfR_J0HDUudLGwlR_E',
  authDomain: 'ideadb-a9c14.firebaseapp.com',
  databaseURL: 'https://ideadb-a9c14.firebaseio.com',
  projectId: 'ideadb-a9c14',
  storageBucket: 'ideadb-a9c14.appspot.com',
  messagingSenderId: '525138405304',
  appId: '1:525138405304:web:5ec3ca599e834f06c0914d',
  measurementId: 'G-XXBBWC1213',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const getIdToken = async (): Promise<string> => {
  const path = 'src/BackendCommunicator/loadKnowledgeFiles';
  const err = (message: string) =>
    new Error1({
      message,
      name: path,
      types: ['input-filtering', 'loud'],
    });

  try {
    const firebaseUser = firebase.auth().currentUser;

    // (IF
    if (firebaseUser === null) throw err('firebaseUser === null');
    // IF)

    const idToken = await firebaseUser.getIdToken();

    // (IF
    if (idToken === '') throw err(`idToken === ''`);
    // IF)

    return idToken;
  } catch (error) {
    throw processError(error, path);
  }
};

export { firebase };
export const firebaseAuthUI = new firebaseui.auth.AuthUI(firebase.auth());
