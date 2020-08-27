import React, { useEffect, useState } from 'react'
import styles from "./KnowledgeFileList.module.scss";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Button } from "@material-ui/core";

import { KnowledgeFileActionCreators } from "../../redux/knowledgeFile";
import KnowledgeFile from "../KnowledgeFile/KnowledgeFile";

function KnowledgeFileList() {
  const dispatch = useDispatch()

  console.log("@KnowledgeFileList")
  const knowledgeFiles = useSelector(state => state.knowledgeFile.byIds)
  const knowledgeFilesIds = useSelector(state => state.knowledgeFile.allIds)

  async function createKnowledgeFile() {
    // Clear previous files from redux
    dispatch(KnowledgeFileActionCreators.knowledgeFilesReloaded());

    const response = await axios({
      method: 'POST',
      url: 'https://o3eutj9zwe.execute-api.us-east-1.amazonaws.com/default/knowledgefiles',
      data: {
        "HTMLText": "",
        "plainText": "",
        "properties": {}
      }
    });

    console.log("@response")
    console.log(response)

    // Save data to redux
    for (let i = 0; i < response.data.length; i++) {
      const knowledgeFile = response.data[i];
      dispatch(KnowledgeFileActionCreators.knowledgeFileInfoLoaded(knowledgeFile))
    }
  }

  useEffect(() => {
    
    async function loadKnowledgeFiles() {
      console.log("@loadKnowledgeFiles")

      let response = null;
      try {
        // Default Search
        response = await axios({
          method: 'GET',
          url: 'https://o3eutj9zwe.execute-api.us-east-1.amazonaws.com/default/knowledgefiles'
        });

        console.log("@response")
        console.log(response)

        // Save data to redux
        for (let i = 0; i < response.data.length; i++) {
          const knowledgeFile = response.data[i];
          dispatch(KnowledgeFileActionCreators.knowledgeFileInfoLoaded(knowledgeFile))
        }
      } catch (error) {
        console.log("@error")
        console.log(error)
      }

    }

    loadKnowledgeFiles(KnowledgeFileActionCreators.knowledgeFileInfoLoaded());

  }, []);

  return (
    <div className={styles.text_file_list}> 
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Button onClick={createKnowledgeFile}>Create</Button>
      {knowledgeFilesIds.map((knowledgeFilesId, index) => {
        return (
          <KnowledgeFile  key={index}
                          knowledgeFile={knowledgeFiles[knowledgeFilesId]} />
        );
      })}

    </div>
  )
}

export default KnowledgeFileList
