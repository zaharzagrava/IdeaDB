import React, { ReactElement, useEffect } from 'react';
import {
  Card,
  CardContent,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { firebase, firebaseAuthUI } from '../../backendapi/firebase';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
      flexWrap: 'nowrap',
    },
    gridItem: {
      maxWidth: '100%',
    },
    footer: {
      width: '100%',
      padding: 25,
    },
    callToAction: {},
  })
);

function AuthorizePage(): ReactElement {
  const classes = useStyles();

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

  return (
    <>
      <Grid item container xs={12} className={classes.root} direction="column">
        <Grid item xs={2} className={classes.gridItem} />
        <Grid
          item
          container
          xs={7}
          className={classes.gridItem}
          justify="center"
        >
          <Grid item container xs={12} md={8}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h1" align="center" gutterBottom>
                  knowledge-base
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <b>knowledge-base</b> is an{' '}
                  <a href="https://github.com/zaharzagrava/knowledge-base">
                    open-source
                  </a>{' '}
                  service that provides you with a new way of working with text
                  documents.
                </Typography>
                <ul>
                  <li>
                    <Typography variant="body1" gutterBottom>
                      Instead of using a folder structure, you can filter them
                      by regular expressions.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" gutterBottom>
                      Instead of opening them in a separate tabs (like in Google
                      Docs) or windows (like Windows or MacOS) you immediately
                      see them as a filtered list.
                    </Typography>
                  </li>
                </ul>
                <Typography variant="body1" gutterBottom>
                  These two distinctions make working with your documents easier
                  (because, thanks to regex, you can find basically any kind of
                  documents that you want) and faster (because there is no need
                  to manage dozens of tabs for each opened document).
                </Typography>
                <Typography align="center" className={classes.callToAction}>
                  Login to see for yourself!
                </Typography>
                <div id="firebase-ui-container"></div>
                <Alert severity="warning">
                  <AlertTitle>Warning</AlertTitle>
                  Since this is a test project, all the data about every user{' '}
                  <b>is deleted periodically</b>. If you want to use it for
                  yourself long-term, consider branching it and hosting on your
                  own or contacting me. If I see that reasonable amount of
                  people is interested in using it, I will consider removing the
                  cleaning up process.
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={2} className={classes.gridItem} />

        <Grid item container xs={1} className={classes.gridItem}>
          <Card elevation={3} className={classes.footer}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://zaharzagrava.com/"
            >
              <Typography>Made by Ruslan Plastun</Typography>
            </a>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default AuthorizePage;
