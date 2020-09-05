import React, { useState } from 'react'

import { useSelector, useDispatch } from "react-redux";
import { Card, Typography, Button, Divider } from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from '@ckeditor/ckeditor5-react';
import './KnowledgeFileContent.css' // has to be after CKEditor import
import viewToPlainText from '@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext';
import jsxToString from 'jsx-to-string';
import { API, graphqlOperation } from 'aws-amplify';
import { putKnowledgeFile, deleteKnowledgeFile } from "../../graphql/mutations";
import axios from 'axios';

import { KnowledgeFileActionCreators } from "../../redux/knowledgeFile";
import KnowledgeFileProperties from "../KnowledgeFileProperties/KnowledgeFileProperties";

function convertHTMLToPlainText(HTMLText) {
  var divContainer= document.createElement("div");
  divContainer.innerHTML = HTMLText;
  return divContainer.textContent || divContainer.innerText || "";
}

function KnowledgeFile( {knowledgeFile} ) {
  const duringEditingIntervalDuration = 5000;
  let duringEditingIntervalId = null;
  const afterEditingTimeoutDuration = 3000;
  let afterEditingTimeoutId = null;

  const dispatch = useDispatch()

  async function putKF(knowledgeFileHTML) {
    console.log("@putKnowledgeFile")

    try {
      const response = await API.graphql(graphqlOperation(putKnowledgeFile, {
        id: knowledgeFile.id,
        htmlText: knowledgeFileHTML,
        plainText: convertHTMLToPlainText(knowledgeFileHTML)
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
      <Typography>Properties</Typography>
      <KnowledgeFileProperties knowledgeFile={knowledgeFile}/>
      <Typography>Main</Typography>
      <div className="editor">
        <CKEditor
          editor={ClassicEditor}
          data={knowledgeFile.htmlText}
          onChange={(event, editor) => {
            console.log("@onChange main")
            // console.log(editor.getData())
            // console.log(knowledgeFile.id)
            
            // Start duringEditing saveData if it's not already started
            if(duringEditingIntervalId === null) {
              duringEditingIntervalId = setInterval(() => {
                putKF(editor.getData());
              }, duringEditingIntervalDuration);
            }

            // Restart afterEditing saveData
            if(afterEditingTimeoutId !== null) {
              clearTimeout(afterEditingTimeoutId)
              afterEditingTimeoutId = null;
            }

            afterEditingTimeoutId = setTimeout(() => {
              putKF(editor.getData());

              clearInterval(duringEditingIntervalId)
              duringEditingIntervalId = null;
            }, afterEditingTimeoutDuration);
          }}
          />
      </div>
    </Card>
  )
}

export default KnowledgeFile
