import React from 'react'
import styles from "./KnowledgeFilesPage.module.scss";

import Searchbar from "../Searchbar/Searchbar";
import KnowledgeFileList from "../KnowledgeFileList/KnowledgeFileList";
import AddKnowledgeFile from "../AddKnowledgeFile/AddKnowledgeFile";

function KnowledgeFilesPage() {

  return (
    <>
      <Searchbar />
      <KnowledgeFileList />
      <AddKnowledgeFile />
    </>
  )
}

export default KnowledgeFilesPage
