import React, { useEffect, useState } from 'react'
import styles from "./SearchBar.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { TextField, Drawer, Button, List, ListItem, ListItemIcon, ListItemText, Box, Divider } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid';
import * as Yup from "yup";
import axios from "axios";

import { SearchBarActionCreators as ACs } from "../../redux/SearchBar";
import { Formik, Form } from 'formik';
import FormTextField from "../FormTextField/FormTextField";
import { KnowledgeFileActionCreators } from "../../redux/knowledgeFile";

const initialValues = {
  fileContent: '',
  properties: ''
};

const validationSchema = Yup.object({
  fileContent: Yup.string().required('Required'),
  properties: Yup.string()
});

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

  async function loadKnowledgeFiles(values) {
    console.log("@values")
    console.log(values)
    // Custom Search
    const response = await axios({
      method: 'GET',
      url: 'https://o3eutj9zwe.execute-api.us-east-1.amazonaws.com/default/knowledgefiles',
      params: {
        "searchBarText": values.fileContent,
        "properties": {
          "identifier":[]
        }
      }
    });

    console.log("@response")
    console.log(response)

    // Clear previous files from redux
    dispatch(KnowledgeFileActionCreators.knowledgeFilesReloaded());

    // Save data to redux
    for (let i = 0; i < response.data.length; i++) {
      const knowledgeFile = response.data[i];
      dispatch(KnowledgeFileActionCreators.knowledgeFileInfoLoaded(knowledgeFile))
    }

    // Close the drawer
    console.log("@before toggleDrawer")
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
      <Button>Add</Button>

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
            validationSchema={validationSchema}
            onSubmit={loadKnowledgeFiles}
          >
            <Form>
              <FormTextField label="File Content" name="fileContent" />
              <Divider />
              <FormTextField
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