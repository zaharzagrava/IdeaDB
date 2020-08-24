import React, { useEffect } from 'react'
import styles from "./KnowledgeFileList.module.scss";

import KnowledgeFile from "../KnowledgeFile/KnowledgeFile";

import { useSelector, useDispatch } from "react-redux";

import { KnowledgeFileActionCreators } from "../../redux/knowledge_file";

import axios from "axios";

function KnowledgeFileList() {
  const dispatch = useDispatch()

  const knowledge_files = useSelector(state => state.knowledge_file.byIds)
  const knowledge_files_ids = useSelector(state => state.knowledge_file.allIds)

  useEffect(() => {
    
    // https://docs.google.com/document/d/1AWWAgmxG9r3-IaIDoFRJ5UBu6SnDSGYhGIMigXpevyg/edit?usp=sharing
    async function loadKnowledgeFile() {
      console.log("loadKnowledgeFile")

      const response = await window.gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': "nextPageToken, files(id, name)"
      })

      console.log(response.result.files)
      
      // dispatch(KnowledgeFileActionCreators.knowledgeFileInfoLoaded(knowledgeFile.data));
    }

    loadKnowledgeFile();

  }, [])

  return (
    <div className={styles.text_file_list}> 
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {knowledge_files_ids.map((knowledge_files_id, index) => {
        return (
          <KnowledgeFile knowledge_file={knowledge_files[knowledge_files_id]} />
        );
      })}
    </div>
  )
}

export default KnowledgeFileList
