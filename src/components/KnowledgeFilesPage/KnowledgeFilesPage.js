import React, {useEffect} from 'react'

import { useDispatch } from "react-redux";

import { PropertyActionCreators } from "../../redux/property";
import SearchBar from "../SearchBar/SearchBar";
import KnowledgeFileList from "../KnowledgeFileList/KnowledgeFileList";

function KnowledgeFilesPage() {
  const dispatch = useDispatch()

  return (
    <>
      <SearchBar />
      <KnowledgeFileList />
    </>
  )
}

export default KnowledgeFilesPage
