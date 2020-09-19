import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { Card, Button, Divider } from '@material-ui/core';
import './KnowledgeFileContent.css'; // has to be after CKEditor import
import { API, graphqlOperation } from 'aws-amplify';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-github';

import { putKnowledgeFile } from '../../BackendCommunicator/graphql';
import { deleteKnowledgeFile } from '../../BackendCommunicator/graphql';
import { KnowledgeFileActionCreators } from '../../redux/knowledgeFile';

function KnowledgeFile({ knowledgeFile }) {
  const duringEditingTimeoutDuration = 5000;
  let duringEditingTimeoutlId = null;
  const afterEditingTimeoutDuration = 3000;
  let afterEditingTimeoutId = null;

  const dispatch = useDispatch();

  function execDeleteKnowledgeFile() {
    deleteKnowledgeFile(knowledgeFile).then((knowledgeFile) => {
      dispatch(
        KnowledgeFileActionCreators.knowledgeFileInfoDeleted(knowledgeFile)
      );
    });
  }

  return (
    <Card>
      <Button onClick={execDeleteKnowledgeFile}>Delete</Button>
      <Divider />
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
        width={'100%'}
        onChange={(newValue) => {
          console.log('@onChange properties');

          // Start duringEditing saveData if it's not already started
          if (duringEditingTimeoutlId === null) {
            duringEditingTimeoutlId = setTimeout(() => {
              putKnowledgeFile(knowledgeFile, newValue);
              duringEditingTimeoutlId = null;
            }, duringEditingTimeoutDuration);
          }

          // Restart afterEditing saveData
          if (afterEditingTimeoutId !== null) {
            clearTimeout(afterEditingTimeoutId);
            afterEditingTimeoutId = null;
          }

          afterEditingTimeoutId = setTimeout(() => {
            putKnowledgeFile(knowledgeFile, newValue);

            clearTimeout(duringEditingTimeoutlId);
            duringEditingTimeoutlId = null;
          }, afterEditingTimeoutDuration);
        }}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    </Card>
  );
}

export default KnowledgeFile;
