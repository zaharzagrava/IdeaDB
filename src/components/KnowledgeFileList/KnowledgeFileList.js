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

      // If scrData is not yet loaded by previous hook - wait
      if(srcDataFolderId === null) return;

      // Default Search or Custom Search
      let filesListResponse = null;
      try {
        if(searchBarText === undefined) {
          filesListResponse = await window.gapi.client.drive.files.list({
            'pageSize': 10,
            'q': `'${srcDataFolderId}' in parents and
                  mimeType != 'application/vnd.google-apps.folder'`,
            'fields': "nextPageToken, files(id, name, parents)",
            'orderBy': 'modifiedTime desc'
          })

        } else {
          filesListResponse = await window.gapi.client.drive.files.list({
            'pageSize': 10,
            'q': `fullText contains '${searchBarText}' and
                  '${srcDataFolderId}' in parents and
                  mimeType != 'application/vnd.google-apps.folder'`,
            'fields': "nextPageToken, files(id, name, parents)",
            'orderBy': 'modifiedTime desc'
          })
        }
      } catch (error_result) {
        console.log("!Error : loadKnowledgeFiles")
        console.log(error_result)
      }

      // Remember nextPageToken
      setNextPageToken(filesListResponse.result.nextPageToken);

      console.log("--- filesListResponse ---")
      console.log(filesListResponse)
      
      // Fill redux state with knowledgeFiles data
      for (let i = 0; i < filesListResponse.result.files.length; i++) {
        const knowledgeFile = filesListResponse.result.files[i];

        let response = null;
        try {
          response = await window.gapi.client.drive.files.get({
            fileId: knowledgeFile.id,
            mimeType: 'text/html',
            alt: 'media'
          })

          console.log("--- response ---")
          console.log(response)
        } catch (error_response) {
          console.log("!Error : loadKnowledgeFile")
          console.log(error_response)
        }
        
        knowledgeFile.fullText = response.body;
        dispatch(KnowledgeFileActionCreators.knowledgeFileInfoLoaded(knowledgeFile));
      }

    }

    loadKnowledgeFiles();

  }, [searchBarText, srcDataFolderId]);

  return (
    <div className={styles.text_file_list}> 
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {knowledgeFilesIds.map((knowledgeFilesId, index) => {
        return (
          <KnowledgeFile  key={index}
                          knowledgeBaseFolderId={knowledgeBaseFolderId}
                          srcDataFolderId={srcDataFolderId}
                          knowledgeFile={knowledgeFiles[knowledgeFilesId]} />
        );
      })}

    </div>
  )
}

export default KnowledgeFileList
