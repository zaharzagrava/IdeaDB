import React, { useState } from 'react'

import { Card, Typography  } from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from '@ckeditor/ckeditor5-react';
// import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave';
import viewToPlainText from '@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext';
import jsxToString from 'jsx-to-string';
import axios from 'axios';

import image15 from "./image15.jpg";

import './KnowledgeFileContent.css'

function convertHTMLToPlainText(HTMLText) {
  var divContainer= document.createElement("div");
  divContainer.innerHTML = HTMLText;
  return divContainer.textContent || divContainer.innerText || "";

}

function KnowledgeFile( {knowledgeFile, knowledgeBaseFolderId, srcDataFolderId} ) {

  async function saveData(knowledgeFileHTML) {
    console.log("--- knowledgeFile Autosave ---")
    console.log(":: " + knowledgeFile.id)
    try {
      // // Create .html File
      // let response = await window.gapi.client.drive.files.create({
      //   resource: {
      //     'name': `${knowledgeFile.id}.html`,
      //     'parents': [`${srcDataFolderId}`]
      //   },
      //   media: {
      //     mimeType: 'text/html',
      //     body: knowledgeFileHTML
      //   },
      //   fields: 'id'
      // });

      // --------------------------------------------------------------------

      // var fileMetadata = {
      //   'name': 'photo.jpg'
      // };
      // var media = {
      //   mimeType: 'image/jpeg',
      //   body: image15
      // };
      // const response = await window.gapi.client.drive.files.create({
      //   resource: fileMetadata,
      //   media: media,
      //   fields: 'id'
      // });

      // ----------------------------------WORKS----------------------------------
      const boundary = '-------314159265358979323846';
      const delimiter = "\r\n--" + boundary + "\r\n";
      const close_delim = "\r\n--" + boundary + "--";

      var multipartRequestBody =
        delimiter +
        'Content-Type: ' + 'text/plain' + '\r\n' +
        'Content-Transfer-Encoding: base64\r\n' +
        '\r\n' +
        "A:{GASDFSDFFSDF" +
        close_delim;

      let response = await window.gapi.client.drive.files.create({
        resource: {
          'name': `${knowledgeFile.id}.txt`,
          'mimeType': 'text/plain',
          'body': multipartRequestBody,
          'parents': [`${srcDataFolderId}`]
        },
        fields: 'id'
      });

      // --------------------------------------------------------------------

      // const boundary = '-------314159265358979323846';
      // const delimiter = "\r\n--" + boundary + "\r\n";
      // const close_delim = "\r\n--" + boundary + "--";

      // let response = await window.gapi.client.request({
      //   method: 'post',
      //   path: 'https://www.googleapis.com/upload/drive/v3/files?uploadType=media',
      //   'params': {'mimeType': 'text/plain', 'name': `${knowledgeFile.id}.txt`, 'uploadType': 'multipart', 'alt': 'json'},
      //   body: "ssssssssss--------sssssssss",
      //   headers: {'Content-Type': 'text/plain'}
      // });


      // // Create .txt File
      // let response = await window.gapi.client.drive.files.create({
      //   resource: {
      //     'name': `${knowledgeFile.id}.txt`,
      //     'parents': [`${srcDataFolderId}`]
      //   },
      //   media: {
      //     mimeType: 'text/plain'
      //   },
      //   fields: 'id'
      // })

      console.log(response);

    } catch (error_result) {
      console.log("!Error : knowledgeFile Autosave")
      console.log(error_result)
    }

  }

  return (
    <Card>
      <div className="editor">
        <CKEditor
          editor={ClassicEditor}
          data={knowledgeFile.fullText}
          // plugins={[ Autosave ]}
          config={{

          }}
          onChange={(event, editor) => {
            console.log("onChange")
            // console.log(convertHTMLToPlainText(editor.getData()))
            saveData( editor.getData());

            // setTimeout(() => {
            //   saveData( editor.getData());
            // }, 1000);
          }}
          // autosave={{
          //   save(editor) {
          //     console.log("save")
          //     // return saveData( editor.getData() );
          //   }
          // }}
          />
      </div>
      {/* <div>
        <h2>Content</h2>
        <p>{text}</p>
      </div> */}
    </Card>

  )
}

export default KnowledgeFile
