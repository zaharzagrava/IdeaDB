import React, { ReactElement } from 'react';
import KnowledgeFileCard from '../KnowledgeFileCard/KnowledgeFileCard';
import { useSelector } from 'react-redux';
import {
  Direction,
  GetKnowledgeFilesArgs,
  KnowledgeFile,
  KnowledgeFileFields,
  KnowledgeFileFieldsCAPS,
  NKnowledgeFile,
  StateType,
} from '../../types/types';
import { useGetKnowledgeFiles } from '../../backendapi/graphql';
import { Card, createStyles, makeStyles, Theme } from '@material-ui/core';

// interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    knowledgeFileList: {
      display: 'grid',
      margin: 15,
      gridGap: 15,
    },
  })
);

function KnowledgeFileList(): ReactElement {
  const classes = useStyles();

  const querySettings = useSelector<StateType, GetKnowledgeFilesArgs>(
    (state) => {
      return state.client.knowledgeFileList
        .querySettings as GetKnowledgeFilesArgs;
    }
  );

  const fields = useSelector<StateType, KnowledgeFileFields[]>((state) => {
    return state.client.knowledgeFileList.fields as KnowledgeFileFields[];
  });

  let { data: knowledgeFiles, status, error } = useGetKnowledgeFiles(
    NKnowledgeFile,
    querySettings,
    fields
  );

  if (status === 'loading')
    return (
      <div className={classes.knowledgeFileList}>
        <Card elevation={3}>Loading... </Card>
      </div>
    );
  if (error)
    return (
      <div className={classes.knowledgeFileList}>
        {' '}
        <Card elevation={3}>Error! {error.message}</Card>
      </div>
    );

  knowledgeFiles = knowledgeFiles as KnowledgeFile[];

  return (
    <div className={classes.knowledgeFileList}>
      {knowledgeFiles.map((knowledgeFile, index) => {
        return (
          <KnowledgeFileCard
            key={knowledgeFile.id}
            knowledgeFile={knowledgeFile}
          />
        );
      })}
    </div>
  );
}

export default KnowledgeFileList;
