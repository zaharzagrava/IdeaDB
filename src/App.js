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
    firebase.auth.onAuthStateChanged(
      dispatch,
      AuthActionCreators.loggedIn(),
      AuthActionCreators.loggedOut()
    );
  }, []);

  if (loginStatus) {
    return <KnowledgeFilesPage />;
  } else {
    return <AuthorizePage />;
  }
}

export default App;
