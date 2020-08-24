import React from 'react'

import { Button } from '@material-ui/core';

function AuthorizePage() {

  async function authorizeUser() {
    try {
      await window.gapi.auth2.getAuthInstance().signIn({
        prompt: 'select_account'
      });
    } catch (error) {
      console.log("!Error!")
      console.log(error)
    }
  }

  return (
    <>
      <Button onClick={() => authorizeUser()}>Authorize</Button>
    </>
  )
}

export default AuthorizePage
