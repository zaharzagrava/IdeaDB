import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import KnowledgeFilesPage from './components/KnowledgeFilesPage/KnowledgeFilesPage';
import { AuthActionCreators } from './redux/client';
import { StateType } from './types/types';

import { firebase } from './backendapi/firebase';

interface Props {}

function App({}: Props): ReactElement {
  const loginStatus = useSelector<StateType>(
    (state) => state.client.loginStatus
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function exec() {
      console.log('@idToken');
      const idToken = await firebase.auth().currentUser?.getIdToken();

      console.log(idToken);
    }

    exec();

    firebase.auth().onAuthStateChanged((user) => {
      // if user isn't null then we logged in
      console.log('@onAuthStateChanged');
      console.log(user);
      if (user) {
        dispatch(AuthActionCreators.loggedIn());
      } else {
        dispatch(AuthActionCreators.loggedOut());
      }
    });
  }, []);

  // if (loginStatus) {
  return <KnowledgeFilesPage />;
  // } else {
  // return <AuthorizePage />;
  // }
}

export default App;
