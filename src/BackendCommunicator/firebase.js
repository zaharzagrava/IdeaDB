import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';

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

const wrappedFirebase = {
  auth: {
    onAuthStateChanged: function (dispatch, onLoggedIn, onLoggedOut) {
      firebase.auth().onAuthStateChanged((user) => {
        // if user isn't null then we logged in
        if (user) {
          console.log('@login');
          dispatch(onLoggedIn);
        } else {
          console.log('@logout');
          dispatch(onLoggedOut);
        }
      });
    },
  },
};

export { wrappedFirebase as firebase };
export { firebase as realFirebase };

export const firebaseAuthUI = new firebaseui.auth.AuthUI(firebase.auth());
