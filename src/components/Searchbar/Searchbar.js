import React, { useEffect, useState } from 'react'
import styles from "./SearchBar.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { TextField, Drawer, Button, List, ListItem, ListItemIcon, ListItemText, Box, Divider } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid';
import * as Yup from "yup";
import JSYAML from "js-yaml";
import { API, graphqlOperation } from 'aws-amplify';
import { postKnowledgeFile } from "../../graphql/mutations";
import { getKnowledgeFiles1 } from "../../graphql/myqueries";

import { SearchBarActionCreators as ACs } from "../../redux/SearchBar";
import { Formik, Form } from 'formik';
import FormTextField from "../FormTextField/FormTextField";
import { KnowledgeFileActionCreators } from "../../redux/knowledgeFile";
import CodeField from "../CodeField/CodeField";

const initialValues = {
  fileContent: '',
  properties: ''
};

const validationSchema = Yup.object({
  fileContent: Yup.string().required('Required'),
  properties: Yup.string()
});

function convertYAMLStringToJSONObject(YAMLString) {
  return  JSON.parse( // parse json string to json object
          JSON.stringify( // parse yaml to json string
          JSYAML.load( // parse string to yaml
            YAMLString
          ), null, 2)
          )
}

function Searchbar() {
  console.log("Searchbar render")

  const propertyByIds = useSelector(state => state.property.byIds)
  const propertyAllIds = useSelector(state => state.property.allIds)

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

    const response = await API.graphql(graphqlOperation(postKnowledgeFile));

    console.log("@response")
    console.log(response)

    // Save data to redux
    const knowledgeFile = response.data.postKnowledgeFile;
    dispatch(KnowledgeFileActionCreators.knowledgeFileInfoLoaded(knowledgeFile))
  }

  async function loadKnowledgeFiles(values) {
    console.log("@loadKnowledgeFiles")

    const variables = {
      orderByFields: ["LAST_DATE_TIME_MODIFIED", "DATE_TIME_CREATED"],
      orderByDirections: ["DESC", "DESC"],
      limit: 10,
      offset: 0
    };

    if(values.fileContent !== "") {
      variables.plainText = values.fileContent;
    }

    if(values.properties !== "") {
      variables.properties = JSON.stringify(convertYAMLStringToJSONObject(values.properties));
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
      <Button>Properties</Button>
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
              <FormTextField
                label="File Content"
                name="fileContent" />
              <Divider />
              <CodeField 
                label={"Properties"}
                name={"properties"}/>
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