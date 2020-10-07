import React, { ReactElement } from 'react';

import {
  Card,
  makeStyles,
  createStyles,
  Theme,
  IconButton,
  Typography,
} from '@material-ui/core';
// import './KnowledgeFileContent.css'; // has to be after CKEditor import
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-github';

import {
  useDeleteKnowledgeFile,
  usePutKnowledgeFile,
} from '../../backendapi/graphql';
import {
  GetKnowledgeFilesArgs,
  KnowledgeFile,
  KnowledgeFileFields,
  NKnowledgeFile,
  StateType,
} from '../../types/types';
import { useQueryCache } from 'react-query';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { useSelector } from 'react-redux';

export interface Props {
  knowledgeFile: KnowledgeFile; // id of the knowledge_file editor UI element
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    knowledgeFileCard: {
      position: 'relative',
      overflow: 'visible',
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
  })
);

function KnowledgeFileCard({ knowledgeFile }: Props): ReactElement {
  const classes = useStyles();
  const queryCache = useQueryCache();

  const querySettings = useSelector<StateType, GetKnowledgeFilesArgs>(
    (state) =>
      state.client.knowledgeFileList.querySettings as GetKnowledgeFilesArgs
  );

  const fields = useSelector<StateType, KnowledgeFileFields[]>((state) => {
    return state.client.knowledgeFileList.fields as KnowledgeFileFields[];
  });

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
      idToken: querySettings.idToken,
    }).then((deletedKnowledgeFile) => {
      if (deletedKnowledgeFile === undefined) {
        throw new Error('deletedKnowledgeFile === undefined');
      }

      queryCache.setQueryData<KnowledgeFile[]>(
        [NKnowledgeFile, querySettings, fields],
        (knowledgeFiles) => {
          if (knowledgeFiles === undefined) {
            throw new Error('knowledgeFiles === undefined');
          }
          return knowledgeFiles.filter(
            (knowledgeFile) => knowledgeFile.id !== deletedKnowledgeFile.id
          );
        }
      );
    });
  };

  return (
    <Card className={classes.knowledgeFileCard} elevation={3}>
      <Typography>Knowledge File:</Typography>
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
                idToken: querySettings.idToken,
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
              idToken: querySettings.idToken,
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
      <IconButton
        color="secondary"
        aria-label="add an alarm"
        onClick={onDeleteKnowledgeFile}
        className={classes.closeButton}
      >
        <CancelRoundedIcon />
      </IconButton>
    </Card>
  );
}

export default KnowledgeFileCard;
