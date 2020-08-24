import React from 'react'
import styles from "./AddKnowledgeFile.module.scss";

import { Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

import { useDispatch } from "react-redux";

import axios from "axios";
import { KnowledgeFileActionCreators } from "../../redux/knowledgeFile";

function AddKnowledgeFile() {
  const dispatch = useDispatch()

  async function addKnowledgeFile() {
    console.log("addKnowledgeFile")

    const knowledgeFile = await axios.get('https://o3eutj9zwe.execute-api.us-east-1.amazonaws.com/default/getKnowledgeFiles');
    console.log(knowledgeFile)
    // dispatch(KnowledgeFileActionCreators(knowledgeFile));
  }

  return (
    <>
      <Fab color="primary" aria-label="add" className={styles.fab} onClick={addKnowledgeFile}>
        <AddIcon />
      </Fab>
    </>
  )
}

export default AddKnowledgeFile
