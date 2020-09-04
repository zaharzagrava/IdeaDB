import React, { useState } from 'react'

import { useDispatch } from "react-redux";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from '@ckeditor/ckeditor5-react';
import './KnowledgeFilePropertiesContent.css' // has to be after CKEditor import
import JSYAML from "js-yaml";
import JSON2YAML from "json2yaml";
import { API, graphqlOperation } from 'aws-amplify';
import { putKnowledgeFile, deleteKnowledgeFile } from "../../graphql/mutations";
// import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';

import { KnowledgeFileActionCreators } from "../../redux/knowledgeFile";

function convertHTMLToPlainText(HTMLText) {
  var divContainer= document.createElement("div");
  divContainer.innerHTML = HTMLText;
  return divContainer.textContent || divContainer.innerText || "";
}

function KnowledgeFileProperties( {knowledgeFile} ) {
  const duringEditingIntervalDuration = 5000;
  let duringEditingIntervalId = null;
  const afterEditingTimeoutDuration = 3000;
  let afterEditingTimeoutId = null;

  const dispatch = useDispatch()

  async function putKFProperties(propertiesHTML) {
    console.log("@putKnowledgeFile")

    try {
      console.log(JSON.stringify(JSYAML.load(convertHTMLToPlainText(propertiesHTML)), null, 2))
    }
    catch(error) {
      console.log(error)
    }

    // try {
    //   const response = await API.graphql(graphqlOperation(putKnowledgeFile, {
    //     id: knowledgeFile.id,
    //     properties: JSON.stringify(JSYAML.load(convertHTMLToPlainText(propertiesHTML)), null, 2)
    //   }));

    //   console.log("@response")
    //   console.log(response)
    // } catch (error) {
    //   console.log("@error")
    //   console.log(error)
    // }
  }

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={JSON2YAML.stringify(knowledgeFile.properties)}
        onChange={(event, editor) => {
          console.log("@onChange properties")
          // console.log(editor.getData())
          // console.log(knowledgeFile.id)

          putKFProperties(editor.getData())
          
          // Start duringEditing saveData if it's not already started
          // if(duringEditingIntervalId === null) {
          //   duringEditingIntervalId = setInterval(() => {
          //     putKFProperties(editor.getData());
          //   }, duringEditingIntervalDuration);
          // }

          // // Restart afterEditing saveData
          // if(afterEditingTimeoutId !== null) {
          //   clearTimeout(afterEditingTimeoutId)
          //   afterEditingTimeoutId = null;
          // }

          // afterEditingTimeoutId = setTimeout(() => {
          //   putKFProperties(editor.getData());

          //   clearInterval(duringEditingIntervalId)
          //   duringEditingIntervalId = null;
          // }, afterEditingTimeoutDuration);
        }}
        />
    </>
  )
}

export default KnowledgeFileProperties
