import React, { useEffect } from 'react'

import { firebaseUI } from "../../index";
import * as firebase from 'firebase/app';

function AuthorizePage() {

  useEffect(() => {
    firebaseUI.start("#firebase-ui-container", {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      tosUrl: '/terms-of-service' // This doesn't exist yet
    })
  }, [])

  if (firebaseUI.isPendingRedirect()) {
    console.log("isPendingRedirect")
  }

  return (
    <div id="firebase-ui-container">
    </div>
  )
}

export default AuthorizePage