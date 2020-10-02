import React, { ReactElement } from 'react';
import styles from './KnowledgeFileList.module.scss';
import SearchBar from '../SearchBar/SearchBar';
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
import { Card } from '@material-ui/core';

interface Props {}
function KnowledgeFileList({}: Props): ReactElement {
  const regexList = useSelector<StateType, string[]>((state) => {
    return state.auth.regexList as string[];
  });
  console.log('@regexList');
  console.log(regexList);
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
      <div className={styles.text_file_list}>
        <Card elevation={3}>Loading... </Card>
      </div>
    );
  if (error)
    return (
      <div className={styles.text_file_list}>
        {' '}
        <Card elevation={3}>Error! {error.message}</Card>
      </div>
    );

  knowledgeFiles = knowledgeFiles as KnowledgeFile[];

  return (
    <div className={styles.text_file_list}>
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
