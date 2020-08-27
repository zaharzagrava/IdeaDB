import React, { useEffect, useState } from 'react'
import styles from "./SearchBar.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { TextField, Drawer, Button, List, ListItem, ListItemIcon, ListItemText, Box, Divider } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid';
import * as Yup from "yup";

import { SearchBarActionCreators as ACs } from "../../redux/SearchBar";
import { Formik, Form } from 'formik';
import FormTextField from "../FormTextField/FormTextField";

const validationSchema = Yup.object({
  fileContent: Yup.string().required('Required')
})

async function onSubmit() {
  return Promise.resolve('Resolved')
}

function Searchbar() {
  console.log("Searchbar render")

  const propertyByIds = useSelector(state => state.property.byIds)
  const propertyAllIds = useSelector(state => state.property.allIds)

  const [seachBarId, setSeachBarId] = useState(uuidv4());
  const [drawerOpened, setDrawerOpened] = useState(false);

  const dispatch = useDispatch();

  const toggleDrawer = (open) => (event) => {
    console.log("this is it")
    console.log(event)
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      console.log("null")
      return;
    }

    setDrawerOpened(open);
  };


  useEffect(() => {
    console.log("Searchbar effect")

    dispatch(ACs.elemMounted(seachBarId))

    return () => {
      dispatch(ACs.elemUnmounted(seachBarId))
    }
  }, [])

  const initialValues = {
    fileContent: ''
  }

  for (let i = 0; i < propertyAllIds.length; i++) {
    const propertyId = propertyAllIds[i];
    const property = propertyByIds[propertyId];
    
    initialValues[property.property_name] = '';
  }

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
            onSubmit={onSubmit}
          >
            <Form>
              <FormTextField label="File Content" name="fileContent" />
              <Divider />
              {propertyAllIds.map((propertyId, index) => {
                const property = propertyByIds[propertyId];
                return (
                  <React.Fragment key={propertyId} >
                    <FormTextField
                      label={property.property_name}
                      name={property.property_name}
                      key={propertyId} />
                    <Divider key={propertyId} />
                  </React.Fragment>
                )
              })}
              <Button type="submit" color="primary">Search</Button>
            </Form>
          </Formik>
        </Box>
      </Drawer>
    </div>
  )
}

export default Searchbar