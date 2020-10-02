import React, { ReactElement } from 'react';

import { useQueryCache } from 'react-query';
import {
  Button,
  Card,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { Formik, Form } from 'formik';

import { useDispatch } from 'react-redux';
import { AuthActionCreators } from '../../redux/client';
import CodeField from '../CodeField/CodeField';

interface InitialValues {
  regexList: string;
}

const initialValues: InitialValues = {
  regexList: '',
};

// interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchBar: {
      padding: theme.spacing(2),
    },
  })
);

function SearchBar(): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const queryCache = useQueryCache();

  async function onSubmitRegexList(values: InitialValues) {
    dispatch(AuthActionCreators.regexListUpdated(values.regexList.split('\n')));
    queryCache.invalidateQueries('knowledge_file');
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={onSubmitRegexList}
      >
        <Form>
          <Card elevation={3}>
            <Grid container direction="column" className={classes.searchBar}>
              <Grid item>
                <Typography gutterBottom>Regex:</Typography>
              </Grid>
              <Grid item>
                <Card elevation={2}>
                  <CodeField label={'Regex List'} name={'regexList'} />
                </Card>
              </Grid>
            </Grid>
            <Button type="submit" color="primary" fullWidth>
              Search
            </Button>
          </Card>
        </Form>
      </Formik>
    </div>
  );
}

export default SearchBar;
