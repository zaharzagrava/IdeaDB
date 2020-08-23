import React from 'react'

import styles from "./KnowledgeFileList.module.scss";

import KnowledgeFile from "../KnowledgeFile/KnowledgeFile";

import { useSelector } from "react-redux";

function KnowledgeFileList() {
  const knowledge_files = useSelector(state => state.knowledge_file.byIds)
  const knowledge_files_ids = useSelector(state => state.knowledge_file.allIds)

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
