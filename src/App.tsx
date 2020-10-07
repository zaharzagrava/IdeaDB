import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import KnowledgeFilesPage from './components/KnowledgeFilesPage/KnowledgeFilesPage';
import { AuthActionCreators, LoginStatus } from './redux/client';
import { StateType } from './types/types';
import { Typography } from '@material-ui/core';

import { firebase, getIdToken } from './backendapi/firebase';
import AuthorizePage from './components/AuthorizePage/AuthorizePage';

interface Props {}

function App({}: Props): ReactElement {
  const dispatch = useDispatch();

  const idToken = useSelector<StateType, string>(
    (state) => state.client.knowledgeFileList.querySettings.idToken as string
  );

  const loginStatus = useSelector<StateType, LoginStatus>(
    (state) => state.client.loginStatus as LoginStatus
  );

  useEffect(() => {
    async function exec() {
      try {
        const idToken = await getIdToken();
        dispatch(AuthActionCreators.idTokenUpdated(idToken));
      } catch (error) {
        console.log('App/useEffect');
        console.log(error);
      }

      setTimeout(() => {
        getIdToken()
          .then((idToken) => {
            dispatch(AuthActionCreators.idTokenUpdated(idToken));
          })
          .catch((error) => {
            console.log('App/useEffect/setTimeout');
            console.log(error);
          });
      }, 30 * 60 * 1000);
    }

    firebase.auth().onAuthStateChanged((user) => {
      // if user isn't null then we logged in
      if (user) {
        dispatch(AuthActionCreators.loginStatusUpdated(LoginStatus.LOGGED_IN));
      } else {
        dispatch(AuthActionCreators.loginStatusUpdated(LoginStatus.LOGGED_OUT));
      }
      exec();
    });
  }, []);

  if (loginStatus === LoginStatus.LOGGED_IN && idToken !== '') {
    return <KnowledgeFilesPage />;
  } else {
    if (loginStatus === LoginStatus.PRELOAD) {
      return <Typography>Authorizing...</Typography>;
    } else if (loginStatus === LoginStatus.LOGGED_OUT) {
      return <AuthorizePage />;
    }
  }

  return <></>;
}

export default App;
