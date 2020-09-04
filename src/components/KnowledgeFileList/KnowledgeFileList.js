import React, { useEffect, useState } from 'react'
import styles from "./KnowledgeFileList.module.scss";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Button } from "@material-ui/core";
import { API, graphqlOperation } from 'aws-amplify';
import { getKnowledgeFiles1 } from "../../graphql/myqueries";

import { KnowledgeFileActionCreators } from "../../redux/knowledgeFile";
import KnowledgeFile from "../KnowledgeFile/KnowledgeFile";

function KnowledgeFileList() {
  const dispatch = useDispatch()

  console.log("@KnowledgeFileList")
  const knowledgeFiles = useSelector(state => state.knowledgeFile.byIds)
  const knowledgeFilesIds = useSelector(state => state.knowledgeFile.allIds)

  useEffect(() => {
    
    async function loadKnowledgeFiles() {
      console.log("@loadKnowledgeFiles")

      let response = null;
      try {
        // Default Search
        const response = await API.graphql(graphqlOperation(getKnowledgeFiles1, {
          orderByFields: ["LAST_DATE_TIME_MODIFIED", "DATE_TIME_CREATED"],
          orderByDirections: ["DESC", "DESC"],
          limit: 10,
          offset: 0
        }));
  
        console.log("@response")
        console.log(response)

        // Save data to redux
        for (let i = 0; i < response.data.getKnowledgeFiles.length; i++) {
          const knowledgeFile = response.data.getKnowledgeFiles[i];
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
      {knowledgeFilesIds.map((knowledgeFilesId, index) => {
        console.log("knowledgeFilesId: " + knowledgeFilesId)
        return (
          <KnowledgeFile  key={knowledgeFilesId}
                          knowledgeFile={knowledgeFiles[knowledgeFilesId]} />
        );
      })}

    </div>
  )
}

export default KnowledgeFileList
