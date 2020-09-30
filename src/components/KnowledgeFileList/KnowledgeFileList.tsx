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

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

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
