import React, { useEffect, useState } from 'react'
import styles from "./KnowledgeFileList.module.scss";

import KnowledgeFile from "../KnowledgeFile/KnowledgeFile";

import { useSelector, useDispatch } from "react-redux";

import { KnowledgeFileActionCreators } from "../../redux/knowledgeFile";

import axios from "axios";

function KnowledgeFileList() {
  const dispatch = useDispatch()

  const searchBarText = useSelector(state => state.SearchBar.searchBarText)
  const knowledgeFiles = useSelector(state => state.knowledgeFile.byIds)
  const knowledgeFilesIds = useSelector(state => state.knowledgeFile.allIds)

  useEffect(() => {
    
    async function loadKnowledgeFiles() {
      // Default Search or Custom Search
      const response = await axios({
        method: 'GET',
        url: 'https://o3eutj9zwe.execute-api.us-east-1.amazonaws.com/default/getKnowledgeFiles',
        params: {
          searchBarText: searchBarText,
          tagsList: [{
            tag_type: 'identifier',
            tag_name: 'system'
          }]
        }
      });

      for (let i = 0; i < response.data.result.length; i++) {
        const knowledgeFile = response.data.result[i];
        dispatch(KnowledgeFileActionCreators.knowledgeFileInfoLoaded(knowledgeFile))
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
        return (
          <KnowledgeFile  key={index}
                          knowledgeFile={knowledgeFiles[knowledgeFilesId]} />
        );
      })}

    </div>
  )
}

export default KnowledgeFileList
