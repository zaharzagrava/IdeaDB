import React, { useState } from 'react'

import { useSelector, useDispatch } from "react-redux";
import { Card, Typography, Button } from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from '@ckeditor/ckeditor5-react';
import './KnowledgeFileContent.css' // has to be after CKEditor import
import viewToPlainText from '@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext';
import jsxToString from 'jsx-to-string';
import axios from 'axios';

import { KnowledgeFileActionCreators } from "../../redux/knowledgeFile";

function convertHTMLToPlainText(HTMLText) {
  var divContainer= document.createElement("div");
  divContainer.innerHTML = HTMLText;
  return divContainer.textContent || divContainer.innerText || "";
}

function KnowledgeFile( {knowledgeFile} ) {
  
  const dispatch = useDispatch()

  async function saveData(knowledgeFileHTML) {
    const response = await axios({
      method: 'PUT',
      url: 'https://o3eutj9zwe.execute-api.us-east-1.amazonaws.com/default/knowledgefiles',
      params: {
        "knowledgeFileId": knowledgeFile.id
      },
      data: {
        "HTMLText": knowledgeFileHTML,
        "plainText": convertHTMLToPlainText(knowledgeFileHTML)
      }
    });

    console.log("@response")
    console.log(response)

  }

  async function deleteKnowledgeFile() {
    console.log("@deleteKnowledgeFile")

    try {
      const response = await axios({
        method: 'DELETE',
        url: 'https://o3eutj9zwe.execute-api.us-east-1.amazonaws.com/default/knowledgefiles',
        params: {
          "knowledgeFileId": knowledgeFile.id
        }
      });

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
      <Button onClick={deleteKnowledgeFile}>Delete</Button>
      <div className="editor">
        <CKEditor
          editor={ClassicEditor}
          data={knowledgeFile.plain_text}
          onChange={(event, editor) => {
            console.log("@onChange")
            console.log(editor.getData())
            saveData(editor.getData());
          }}
          />
      </div>
    </Card>
  )
}

export default KnowledgeFile
