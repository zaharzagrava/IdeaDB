import React, { useState } from 'react'

import { useDispatch } from "react-redux";
import { Card, Button, Divider } from "@material-ui/core";
import './KnowledgeFileContent.css' // has to be after CKEditor import
import { API, graphqlOperation } from 'aws-amplify';
import { putKnowledgeFile, deleteKnowledgeFile } from "../../graphql/mutations";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-github";

import { KnowledgeFileActionCreators } from "../../redux/knowledgeFile";

function KnowledgeFile( {knowledgeFile} ) {
  const duringEditingTimeoutDuration = 5000;
  let duringEditingTimeoutlId = null;
  const afterEditingTimeoutDuration = 3000;
  let afterEditingTimeoutId = null;

  const dispatch = useDispatch()

  async function putKF(srcText) {
    console.log("@putKnowledgeFile")

    try {
      const response = await API.graphql(graphqlOperation(putKnowledgeFile, {
        id: knowledgeFile.id,
        srcText: srcText
      }));

      console.log("@response")
      console.log(response)
    } catch (error) {
      console.log("@error")
      console.log(error)
    }
  }
  async function deleteKF() {
    console.log("@deleteKnowledgeFile")

    try {
      const response = await API.graphql(graphqlOperation(deleteKnowledgeFile, {
        id: knowledgeFile.id,
      }));

      console.log("@response")
      console.log(response)

      dispatch(KnowledgeFileActionCreators.knowledgeFileInfoDeleted(knowledgeFile));
    } catch (error) {
      console.log("@error")
      console.log(error)
    }

  }
  return (
    <Card>
      <Button onClick={deleteKF}>Delete</Button>
      <Divider/>
      <AceEditor
          mode="yaml"
          theme="github"
          maxLines={Infinity}
          tabSize={2}
          showGutter={false}
          highlightActiveLine={false}
          defaultValue={knowledgeFile.srcText}
          // enableBasicAutocompletion={true}
          // enableLiveAutocompletion={true}
          width={"100%"}
          onChange={(newValue) => {
            console.log("@onChange properties")
            // console.log(newValue)
            // putKF(newValue)
            
            // Start duringEditing saveData if it's not already started
            if(duringEditingTimeoutlId === null) {
              duringEditingTimeoutlId = setTimeout(() => {
                putKF(newValue);
                duringEditingTimeoutlId = null;
              }, duringEditingTimeoutDuration);
            }
  
            // Restart afterEditing saveData
            if(afterEditingTimeoutId !== null) {
              clearTimeout(afterEditingTimeoutId)
              afterEditingTimeoutId = null;
            }
  
            afterEditingTimeoutId = setTimeout(() => {
              putKF(newValue);
  
              clearTimeout(duringEditingTimeoutlId)
              duringEditingTimeoutlId = null;
            }, afterEditingTimeoutDuration);
          }}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
    </Card>
  )
}

export default KnowledgeFile
