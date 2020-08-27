import React, { useState } from 'react'

import { Card, Typography, Button } from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from '@ckeditor/ckeditor5-react';
// import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave';
import viewToPlainText from '@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext';
import jsxToString from 'jsx-to-string';
import axios from 'axios';

import './KnowledgeFileContent.css'

function convertHTMLToPlainText(HTMLText) {
  var divContainer= document.createElement("div");
  divContainer.innerHTML = HTMLText;
  return divContainer.textContent || divContainer.innerText || "";
}

function KnowledgeFile( {knowledgeFile} ) {

  async function saveData(knowledgeFileHTML) {
    // save knowledgeFile content
  }

  return (
    <Card>
      <Button>Delete</Button>
      <div className="editor">
        <CKEditor
          editor={ClassicEditor}
          data={knowledgeFile.plain_text}
          onChange={(event, editor) => {
            console.log("onChange")
            saveData( editor.getData());
          }}
          />
      </div>
    </Card>
  )
}

export default KnowledgeFile
