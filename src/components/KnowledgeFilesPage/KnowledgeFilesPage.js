import React, {useEffect} from 'react'

import SearchBar from "../SearchBar/SearchBar";
import KnowledgeFileList from "../KnowledgeFileList/KnowledgeFileList";
import AddKnowledgeFile from "../AddKnowledgeFile/AddKnowledgeFile";

function KnowledgeFilesPage() {

  return (
    <>
      <SearchBar />
      <KnowledgeFileList />
      <AddKnowledgeFile />
    </>
  )
}

export default KnowledgeFilesPage
