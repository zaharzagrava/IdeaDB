import React, {useEffect} from 'react'

import { useDispatch } from "react-redux";

import { PropertyActionCreators } from "../../redux/property";
import SearchBar from "../SearchBar/SearchBar";
import KnowledgeFileList from "../KnowledgeFileList/KnowledgeFileList";

function KnowledgeFilesPage() {
  const dispatch = useDispatch()

  console.log("KnowledgeFilesPage render")

  useEffect(() => {
    // load all client's properties
    console.log("KnowledgeFilesPage effect")
    
    dispatch(PropertyActionCreators.propertyInfoLoaded({
      id: 1,
      property_name: 'identifier',
      property_value: 'system'
    }));
    dispatch(PropertyActionCreators.propertyInfoLoaded({
      id: 2,
      property_name: 'identifier',
      property_value: 'argument'
    }));
    dispatch(PropertyActionCreators.propertyInfoLoaded({
      id: 3,
      property_name: 'identifier',
      property_value: 'complexity'
    }));
    dispatch(PropertyActionCreators.propertyInfoLoaded({
      id: 4,
      property_name: 'discipline',
      property_value: 'biology'
    }));
    dispatch(PropertyActionCreators.propertyInfoLoaded({
      id: 5,
      property_name: 'discipline',
      property_value: 'physics'
    }));

  }, [])

  return (
    <>
      <SearchBar />
      <KnowledgeFileList />
    </>
  )
}

export default KnowledgeFilesPage
