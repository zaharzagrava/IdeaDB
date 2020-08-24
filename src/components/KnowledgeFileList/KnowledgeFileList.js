import React, { useEffect, useState } from 'react'
import styles from "./KnowledgeFileList.module.scss";

import KnowledgeFile from "../KnowledgeFile/KnowledgeFile";

import { useSelector, useDispatch } from "react-redux";

import { KnowledgeFileActionCreators } from "../../redux/knowledgeFile";

import axios from "axios";

function KnowledgeFileList() {
  const dispatch = useDispatch()

  const [nextPageToken, setNextPageToken] = useState(null);
  const [knowledgeBaseFolderId, setKnowledgeBaseFolderId] = useState(null);
  const [srcDataFolderId, setSrcDataFolderId] = useState(null);

  const knowledgeBaseFolder = useSelector(state => state.knowledgeFile.byIds[knowledgeBaseFolderId])
  const srcDataFolder = useSelector(state => state.knowledgeFile.byIds[srcDataFolderId])
  const searchBarText = useSelector(state => state.SearchBar.searchBarText)
  const knowledgeFiles = useSelector(state => state.knowledgeFile.byIds)
  const knowledgeFilesIds = useSelector(state => state.knowledgeFile.allIds)

  useEffect(() => {
    
    async function loadFoldersIds() {
      let knowledgeBaseFolderIdLocal = null;
      let srcDataFolderIdLocal = null;

      console.log("--- Knowledge Base ---")
      // Find / Create 'Knowledge Base' folder
      try {
        // Find 'Knowledge Base' folder
        const response = await window.gapi.client.drive.files.list({
          'pageSize': 1,
          'q': `name = 'Knowledge Base' and
                'root' in parents and
                mimeType = 'application/vnd.google-apps.folder'`,
          'fields': "nextPageToken, files(id, name, parents, spaces)"
        })

        console.log(response.result.files)

        if(response.result.files.length !== 0) {
          knowledgeBaseFolderIdLocal = response.result.files[0].id;
        } else {
          // Create 'Knowledge Base' folder
          console.log("File not found. Creating 'Knowledge Base'")

          const response = await window.gapi.client.drive.files.create({
            resource: {
              'name': 'Knowledge Base',
              'mimeType': 'application/vnd.google-apps.folder',
              'parents': [`root`]
            },
            fields: 'id'
          });

          console.log(response)

          knowledgeBaseFolderIdLocal = response.result.id;
        }

        setKnowledgeBaseFolderId(knowledgeBaseFolderIdLocal);
      } catch (error_result) {
        console.log("!Error : Knowledge Base")
        console.log(error_result)
      }

      console.log("--- srcData ---")
      // Find / Create 'srcData' folder in 'Knowledge Base' folder
      try {
        // Find 'srcData' folder
        const response = await window.gapi.client.drive.files.list({
          'pageSize': 1,
          'q': `name = 'srcData' and
                '${knowledgeBaseFolderIdLocal}' in parents and
                mimeType = 'application/vnd.google-apps.folder'`,
          'fields': "nextPageToken, files(id, name, parents)"
        })

        console.log(response.result.files)

        if(response.result.files.length !== 0) {
          srcDataFolderIdLocal = response.result.files[0].id;
        } else {
          // Create 'srcData' folder
          console.log("File not found. Creating 'srcData'")

          const response = await window.gapi.client.drive.files.create({
            resource: {
              'name': 'srcData',
              'mimeType': 'application/vnd.google-apps.folder',
              'parents': [`${knowledgeBaseFolderIdLocal}`]
            },
            fields: 'id'
          });

          console.log(response)

          srcDataFolderIdLocal = response.result.id;
        }

        setSrcDataFolderId(srcDataFolderIdLocal);
      } catch (error_result) {
        console.log("!Error : srcData")
        console.log(error_result)
      }
    }

    loadFoldersIds();

  }, [])

  useEffect(() => {
    
    async function loadKnowledgeFiles() {

      function parseSearchBarText(searchBarText) {
        return searchBarText;
      }

      const searchQuery = parseSearchBarText(searchBarText);

      const response = await window.gapi.client.drive.files.list({
        'pageSize': 100,
        'q': `name contains 'alp' and
              mimeType != 'application/vnd.google-apps.folder'`,
        'fields': "nextPageToken, files(id, name, parents)",
        'orderBy': 'modifiedTime desc'
      })
      
      setNextPageToken(response.result.nextPageToken);
      
      for (let i = 0; i < response.result.files.length; i++) {
        const knowledgeFile = response.result.files[i];
        dispatch(KnowledgeFileActionCreators.knowledgeFileInfoLoaded(knowledgeFile));
      }
    }

    loadKnowledgeFiles();

  }, [searchBarText]);

  return (
    <div className={styles.text_file_list}> 
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {/* {knowledge_files_ids.map((knowledge_files_id, index) => {
        return (
          <KnowledgeFile knowledge_file={knowledge_files[knowledge_files_id]} />
        );
      })} */}
    </div>
  )
}

export default KnowledgeFileList
