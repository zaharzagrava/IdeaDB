import React, { useState } from 'react'

import { useDispatch } from "react-redux";

import './KnowledgeFilePropertiesContent.css' // has to be after CKEditor import
import JSYAML from "js-yaml";
import { API, graphqlOperation } from 'aws-amplify';
import { putKnowledgeFile, deleteKnowledgeFile } from "../../graphql/mutations";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-github";

function onChange(newValue) {
  console.log("change", newValue);
}

function convertHTMLToPlainText(HTMLText) {
  var divContainer= document.createElement("div");
  divContainer.innerHTML = HTMLText;
  return divContainer.textContent || divContainer.innerText || "";
}

function KnowledgeFileProperties( {knowledgeFile} ) {
  const duringEditingTimeoutDuration = 5000;
  let duringEditingTimeoutlId = null;
  const afterEditingTimeoutDuration = 3000;
  let afterEditingTimeoutId = null;

  const dispatch = useDispatch()

  console.log(JSYAML.safeDump(JSON.parse(knowledgeFile.properties)))

  async function putKFProperties(properties) {
    console.log("@putKnowledgeFile")

    let propertiesJSON = null;
    let isValid = false;
    try {
      propertiesJSON = JSON.parse( // parse json string to json object
                       JSON.stringify( // parse yaml to json string
                       JSYAML.load( // parse string to yaml
                       properties
                       ), null, 2)
                       )

      console.log(typeof propertiesJSON)
      console.log(propertiesJSON)

      if(typeof propertiesJSON !== 'object') {
        throw 'JSON is not an object'
      }

      isValid = true;
    }
    catch(error) {
      console.log(error)
      isValid = false;
    }

    if(isValid) {
      try {
        const response = await API.graphql(graphqlOperation(putKnowledgeFile, {
          id: knowledgeFile.id,
          properties: JSON.stringify(propertiesJSON)
        }));
  
        console.log("@response")
        console.log(response)
      } catch (error) {
        console.log("@error")
        console.log(error)
      }
    }
  }

  return (
    <>
      <AceEditor
          mode="yaml"
          theme="github"
          maxLines={Infinity}
          tabSize={2}
          showGutter={false}
          highlightActiveLine={false}
          defaultValue={JSYAML.safeDump(JSON.parse(knowledgeFile.properties))}
          // enableBasicAutocompletion={true}
          // enableLiveAutocompletion={true}
          width={"100%"}
          onChange={(newValue) => {
            console.log("@onChange properties")
            // console.log(newValue)
            // putKFProperties(newValue)
            
            // Start duringEditing saveData if it's not already started
            if(duringEditingTimeoutlId === null) {
              duringEditingTimeoutlId = setTimeout(() => {
                putKFProperties(newValue);
                duringEditingTimeoutlId = null;
              }, duringEditingTimeoutDuration);
            }
  
            // Restart afterEditing saveData
            if(afterEditingTimeoutId !== null) {
              clearTimeout(afterEditingTimeoutId)
              afterEditingTimeoutId = null;
            }
  
            afterEditingTimeoutId = setTimeout(() => {
              putKFProperties(newValue);
  
              clearTimeout(duringEditingTimeoutlId)
              duringEditingTimeoutlId = null;
            }, afterEditingTimeoutDuration);
          }}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
    </>
  )
}

export default KnowledgeFileProperties
