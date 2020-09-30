import React, { ReactElement } from 'react';

import { Card, Button, Divider } from '@material-ui/core';
import './KnowledgeFileContent.css'; // has to be after CKEditor import
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-github';

import {
  useDeleteKnowledgeFile,
  usePutKnowledgeFile,
} from '../../backendapi/graphql';
import { KnowledgeFile, KnowledgeFileFields } from '../../types/types';
import { useQueryCache } from 'react-query';

interface Props {
  knowledgeFile: KnowledgeFile; // id of the knowledge_file editor UI element
}

function KnowledgeFileCard({ knowledgeFile }: Props): ReactElement {
  const queryCache = useQueryCache();

  const [putKNowledgeFile] = usePutKnowledgeFile(undefined, [
    KnowledgeFileFields.id,
    KnowledgeFileFields.srcText,
    KnowledgeFileFields.lastDateTimeModified,
  ]);

  const [deleteKnowledgeFile] = useDeleteKnowledgeFile(undefined, [
    KnowledgeFileFields.id,
    KnowledgeFileFields.srcText,
    KnowledgeFileFields.lastDateTimeModified,
  ]);

  const duringEditingTimeoutDuration = 5000;
  let duringEditingTimeoutlId: NodeJS.Timeout | undefined = undefined;
  const afterEditingTimeoutDuration = 3000;
  let afterEditingTimeoutId: NodeJS.Timeout | undefined = undefined;

  const onDeleteKnowledgeFile = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();

    deleteKnowledgeFile({
      id: knowledgeFile.id,
      idToken: '',
    }).then(() => {
      queryCache.invalidateQueries('knowledge_file');
    });
  };

  return (
    <Card>
      <Button onClick={onDeleteKnowledgeFile}>Delete</Button>
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
        onChange={(editedSrcText) => {
          // Start duringEditing saveData if it's not already started
          if (duringEditingTimeoutlId === undefined) {
            duringEditingTimeoutlId = setTimeout(() => {
              putKNowledgeFile({
                id: knowledgeFile.id,
                srcText: editedSrcText,
                idToken: '',
              });
              duringEditingTimeoutlId = undefined;
            }, duringEditingTimeoutDuration);
          }

          // Restart afterEditing saveData
          if (afterEditingTimeoutId !== undefined) {
            clearTimeout(afterEditingTimeoutId);
            afterEditingTimeoutId = undefined;
          }

          afterEditingTimeoutId = setTimeout(() => {
            putKNowledgeFile({
              id: knowledgeFile.id,
              srcText: editedSrcText,
              idToken: '',
            });

            if (duringEditingTimeoutlId !== undefined) {
              clearTimeout(duringEditingTimeoutlId);
            }

            duringEditingTimeoutlId = undefined;
          }, afterEditingTimeoutDuration);
        }}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    </Card>
  );
}

export default KnowledgeFileCard;
