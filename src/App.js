import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { firebase } from './BackendCommunicator/firebase';
import { AuthActionCreators } from './redux/auth';
import AuthorizePage from './components/AuthorizePage/AuthorizePage';
import KnowledgeFilesPage from './components/KnowledgeFilesPage/KnowledgeFilesPage';

function App() {
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('@App');
    console.log(firebase.auth.GoogleAuthProvider.PROVIDER_ID);
    firebase.auth().onAuthStateChanged((user) => {
      // if user isn't null then we logged in
      if (user) {
        console.log('@login');
        dispatch(AuthActionCreators.loggedIn());
      } else {
        console.log('@logout');
        dispatch(AuthActionCreators.loggedOut());
      }
    });
  }, []);

  if (loginStatus) {
    return <KnowledgeFilesPage />;
  } else {
    return <AuthorizePage />;
  }
}

export default App;
