import React, { ReactElement } from 'react';

import SearchBar from '../SearchBar/SearchBar';
import KnowledgeFileList from '../KnowledgeFileList/KnowledgeFileList';
import { createStyles, Fab, makeStyles, Theme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {
  GetKnowledgeFilesArgs,
  KnowledgeFile,
  KnowledgeFileFields,
  NKnowledgeFile,
  StateType,
} from '../../types/types';
import { AuthActionCreators } from '../../redux/client';
import { usePostKnowledgeFile } from '../../backendapi/graphql';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryCache } from 'react-query';

// interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

function KnowledgeFilesPage(): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const queryCache = useQueryCache();

  const querySettings = useSelector<StateType, GetKnowledgeFilesArgs>(
    (state) =>
      state.client.knowledgeFileList.querySettings as GetKnowledgeFilesArgs
  );

  const fields = useSelector<StateType, KnowledgeFileFields[]>((state) => {
    return state.client.knowledgeFileList.fields as KnowledgeFileFields[];
  });

  const [postKnowledgeFile] = usePostKnowledgeFile(
    (knowledgeFile) => {
      queryCache.setQueryData<KnowledgeFile[]>(
        [NKnowledgeFile, querySettings, fields],
        (knowledgeFiles) => {
          if (knowledgeFiles === undefined) {
            throw new Error('knowledgeFiles === undefined');
          }
          return knowledgeFiles.concat(knowledgeFile);
        }
      );
    },
    [
      KnowledgeFileFields.id,
      KnowledgeFileFields.srcText,
      KnowledgeFileFields.lastDateTimeModified,
    ]
  );

  const onCreateKnowledgeFile = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();

    postKnowledgeFile({
      srcText: 'New File',
      idToken: querySettings.idToken,
    });
  };

  return (
    <>
      <SearchBar />
      <KnowledgeFileList />
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={onCreateKnowledgeFile}
      >
        <AddIcon />
      </Fab>
    </>
  );
}

export default KnowledgeFilesPage;
