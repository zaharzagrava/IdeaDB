import React, { useEffect, useState } from 'react'
import styles from "./SearchBar.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { Drawer, Button, Box, Divider } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid';
import * as Yup from "yup";
import { API, graphqlOperation } from 'aws-amplify';
import { postKnowledgeFile } from "../../graphql/mutations";
import { getKnowledgeFiles1 } from "../../graphql/myqueries";
import * as firebase from 'firebase/app';

import { SearchBarActionCreators as ACs } from "../../redux/SearchBar";
import { Formik, Form } from 'formik';
import { KnowledgeFileActionCreators } from "../../redux/knowledgeFile";
import CodeField from "../CodeField/CodeField";

const initialValues = {
  regexList: ''
};

function Searchbar() {
  console.log("Searchbar render")

  const [seachBarId, setSeachBarId] = useState(uuidv4());
  const [drawerOpened, setDrawerOpened] = useState(false);

  const dispatch = useDispatch();

  const toggleDrawer = (open) => (event) => {
    console.log("@toggleDrawer")
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    console.log("@setDrawerOpened")
    setDrawerOpened(open);
  };

  async function createKnowledgeFile() {
    // Clear previous files from redux
    dispatch(KnowledgeFileActionCreators.knowledgeFilesReloaded());

    const idToken = await firebase.auth().currentUser.getIdToken();

    const response = await API.graphql(graphqlOperation(postKnowledgeFile, {
      idToken: idToken
    }));

    console.log("@response")
    console.log(response)

    // Save data to redux
    const knowledgeFile = response.data.postKnowledgeFile;
    dispatch(KnowledgeFileActionCreators.knowledgeFileInfoLoaded(knowledgeFile))
  }

  async function loadKnowledgeFiles(values) {
    console.log("@loadKnowledgeFiles")
    
    const idToken = await firebase.auth().currentUser.getIdToken();

    const variables = {
      orderByFields: ["LAST_DATE_TIME_MODIFIED", "DATE_TIME_CREATED"],
      orderByDirections: ["DESC", "DESC"],
      limit: 10,
      offset: 0,
      idToken: idToken
    };

    variables.regexList = values.regexList.split('\n');
    for (let i = 0; i < variables.regexList.length; i++) {
      variables.regexList[i] = `${variables.regexList[i]}`;
    }

    console.log("@variables")
    console.log(variables)

    // Custom Search
    const response = await API.graphql(graphqlOperation(getKnowledgeFiles1, variables));

    console.log("@response")
    console.log(response)

    // Clear previous files from redux
    dispatch(KnowledgeFileActionCreators.knowledgeFilesReloaded());

    // Save data to redux
    for (let i = 0; i < response.data.getKnowledgeFiles.length; i++) {
      const knowledgeFile = response.data.getKnowledgeFiles[i];
      dispatch(KnowledgeFileActionCreators.knowledgeFileInfoLoaded(knowledgeFile))
    }

    // Close the drawer
    console.log("@setDrawerOpened")
    setDrawerOpened(false);
  }

  useEffect(() => {
    console.log("Searchbar effect")

    dispatch(ACs.elemMounted(seachBarId))

    return () => {
      dispatch(ACs.elemUnmounted(seachBarId))
    }
  }, []);

  return (
    <div className={styles.filter}>
      <Button onClick={toggleDrawer(true)}>Search</Button>
      <Button>Settings</Button>
      <Button onClick={createKnowledgeFile}>Create</Button>

      <Drawer
        anchor='left'
        open={drawerOpened}
        onClose={toggleDrawer(false)}
        >
        <Box width="100vw" >
          <Button>Refresh</Button>
          <Button onClick={toggleDrawer(false)}>Close</Button>
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={loadKnowledgeFiles}
          >
            <Form>
              <CodeField 
                label={"Regex List"}
                name={"regexList"}/>
              <Divider />
              <Button type="submit" color="primary">Search</Button>
            </Form>
          </Formik>
        </Box>
      </Drawer>
    </div>
  )
}

export default Searchbar