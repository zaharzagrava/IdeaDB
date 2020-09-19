import React, { useEffect, useState } from 'react';
import styles from './SearchBar.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Button, Box, Divider } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { API, graphqlOperation } from 'aws-amplify';
import { getKnowledgeFiles1 } from '../../graphql/myqueries';
import { Formik, Form } from 'formik';
import * as firebase from 'firebase/app';

import {
  postKnowledgeFile,
  loadKnowledgeFiles,
} from '../../BackendCommunicator/graphql';
import { SearchBarActionCreators as ACs } from '../../redux/SearchBar';
import { KnowledgeFileActionCreators } from '../../redux/knowledgeFile';
import CodeField from '../CodeField/CodeField';

const initialValues = {
  regexList: '',
};

function Searchbar() {
  console.log('Searchbar render');

  const [seachBarId, setSeachBarId] = useState(uuidv4());
  const [drawerOpened, setDrawerOpened] = useState(false);

  const dispatch = useDispatch();

  const toggleDrawer = (open) => (event) => {
    console.log('@toggleDrawer');
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    console.log('@setDrawerOpened');
    setDrawerOpened(open);
  };

  useEffect(() => {
    console.log('Searchbar effect');

    dispatch(ACs.elemMounted(seachBarId));

    return () => {
      dispatch(ACs.elemUnmounted(seachBarId));
    };
  }, []);

  function execCreateKnowledgeFile() {
    // Clear previous files from redux
    dispatch(KnowledgeFileActionCreators.knowledgeFilesReloaded());

    postKnowledgeFile().then((knowledgeFile) => {
      // Save data to redux
      dispatch(
        KnowledgeFileActionCreators.knowledgeFileInfoLoaded(knowledgeFile)
      );
    });
  }

  async function execLoadKnowledgeFiles(values) {
    console.log('@loadKnowledgeFiles');
    // Clear previous files from redux
    dispatch(KnowledgeFileActionCreators.knowledgeFilesReloaded());

    loadKnowledgeFiles(
      values.regexList.split('\n'),
      ['LAST_DATE_TIME_MODIFIED', 'DATE_TIME_CREATED'],
      ['DESC', 'DESC'],
      10,
      0
    ).then((knowledgeFiles) => {
      // Save data to redux
      for (let i = 0; i < knowledgeFiles.length; i++) {
        const knowledgeFile = knowledgeFiles[i];
        dispatch(
          KnowledgeFileActionCreators.knowledgeFileInfoLoaded(knowledgeFile)
        );
      }
    });

    // Close the drawer
    console.log('@setDrawerOpened');
    setDrawerOpened(false);
  }

  return (
    <div className={styles.filter}>
      <Button onClick={toggleDrawer(true)}>Search</Button>
      <Button>Settings</Button>
      <Button onClick={execCreateKnowledgeFile}>Create</Button>

      <Drawer anchor="left" open={drawerOpened} onClose={toggleDrawer(false)}>
        <Box width="100vw">
          <Button>Refresh</Button>
          <Button onClick={toggleDrawer(false)}>Close</Button>
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={execLoadKnowledgeFiles}
          >
            <Form>
              <CodeField label={'Regex List'} name={'regexList'} />
              <Divider />
              <Button type="submit" color="primary">
                Search
              </Button>
            </Form>
          </Formik>
        </Box>
      </Drawer>
    </div>
  );
}

export default Searchbar;
