import React, { useState, useEffect } from 'react';

import KnowledgeFilesPage from "./components/KnowledgeFilesPage/KnowledgeFilesPage";

import { useDispatch } from "react-redux";

import useScript from './hooks/useScript';

import { AuthActionCreators } from "./redux/auth";
import AuthorizePage from './components/AuthorizePage/AuthorizePage';

function App() {
  const dispatch = useDispatch()
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // --- Setting up Google API
    const CLIENT_ID = '1016499845571-mo5fch462nd5epk3a43gm7cjgplhv0uj.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyAwila-xBl8Jewi61y7d_q_gpWgYAsWZB4';
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
    const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

    // Inserting the script into html
    const script = document.createElement('script');

    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.onload = () => {
      window.gapi.load('client:auth2', initClient);
    };

    document.body.appendChild(script);

    // Running Authorizatino
    async function initClient() {
      try{
        await window.gapi.client.init({
          'apiKey': API_KEY,
          'clientId': CLIENT_ID,
          'scope': SCOPES,
          'discoveryDocs': DISCOVERY_DOCS
        })
        
        const googleAuth = window.gapi.auth2.getAuthInstance();
        googleAuth.isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(googleAuth.isSignedIn.get())

        dispatch(AuthActionCreators.googleAuthInfoLoaded(googleAuth));
      } catch(e) {
        console.log("!Error!")
        console.log(e);
      }
    }

    function updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        console.log("The User is signed in")
      } else {
        console.log("The User is signed out")
      }

      setIsAuthorized(isSignedIn)
    }
    
  }, [])

  if(isAuthorized) {
    return (
      <KnowledgeFilesPage />
    )
  } else {
    return (
      <AuthorizePage />
    )
  }
}

export default App;
