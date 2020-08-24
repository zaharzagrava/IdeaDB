import React, {useEffect} from 'react'

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
