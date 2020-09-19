import React, { useEffect } from 'react';

import { firebase, firebaseAuthUI } from '../../BackendCommunicator/firebase';

function AuthorizePage() {
  useEffect(() => {
    firebaseAuthUI.start('#firebase-ui-container', {
      signInSuccessUrl: '/',
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      tosUrl: '/terms-of-service', // This doesn't exist yet
    });
  }, []);

  if (firebaseAuthUI.isPendingRedirect()) {
    console.log('isPendingRedirect');
  }

  return <div id="firebase-ui-container"></div>;
}

export default AuthorizePage;
