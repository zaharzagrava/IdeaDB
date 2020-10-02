import React, { ReactElement } from 'react';

import SearchBar from '../SearchBar/SearchBar';
import KnowledgeFileList from '../KnowledgeFileList/KnowledgeFileList';
import { createStyles, Fab, makeStyles, Theme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { KnowledgeFileFields } from '../../types/types';
import { AuthActionCreators } from '../../redux/auth';
import { usePostKnowledgeFile } from '../../backendapi/graphql';
import { useDispatch } from 'react-redux';
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

  const [postKnowledgeFile] = usePostKnowledgeFile(() => {
    dispatch(AuthActionCreators.regexListUpdated(['New File']));
    queryCache.invalidateQueries('knowledge_file');
  }, [
    KnowledgeFileFields.id,
    KnowledgeFileFields.srcText,
    KnowledgeFileFields.lastDateTimeModified,
  ]);

  const onCreateKnowledgeFile = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();

    postKnowledgeFile({
      srcText: 'New File',
      idToken: '',
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
