import React, { ReactElement } from 'react';
import KnowledgeFileCard from '../KnowledgeFileCard/KnowledgeFileCard';
import { useSelector } from 'react-redux';
import {
  Direction,
  KnowledgeFile,
  KnowledgeFileFields,
  KnowledgeFileFieldsCAPS,
  StateType,
} from '../../types/types';
import { useGetKnowledgeFiles } from '../../backendapi/graphql';
import { Card, createStyles, makeStyles, Theme } from '@material-ui/core';

// interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textFileList: {
      display: 'grid',
      margin: 15,
      gridGap: 15,
    },
  })
);

function KnowledgeFileList(): ReactElement {
  const classes = useStyles();

  const regexList = useSelector<StateType, string[]>((state) => {
    return state.auth.regexList as string[];
  });

  let { data: knowledgeFiles, status, error } = useGetKnowledgeFiles(
    'knowledge_file',
    {
      regexList: regexList,
      knowledgeFileOrderSettings: [
        {
          orderDirection: Direction.DESC,
          orderField: KnowledgeFileFieldsCAPS.LAST_DATE_TIME_MODIFIED,
        },
      ],
      limit: 5,
      offset: 0,
      idToken: '',
    },
    [
      KnowledgeFileFields.id,
      KnowledgeFileFields.srcText,
      KnowledgeFileFields.lastDateTimeModified,
    ]
  );

  if (status === 'loading')
    return (
      <div className={classes.textFileList}>
        <Card elevation={3}>Loading... </Card>
      </div>
    );
  if (error)
    return (
      <div className={classes.textFileList}>
        {' '}
        <Card elevation={3}>Error! {error.message}</Card>
      </div>
    );

  knowledgeFiles = knowledgeFiles as KnowledgeFile[];

  return (
    <div className={classes.textFileList}>
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
