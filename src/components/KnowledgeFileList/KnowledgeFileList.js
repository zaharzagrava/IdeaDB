import React, { useEffect, useState } from 'react';
import styles from './KnowledgeFileList.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import { loadKnowledgeFiles } from '../../BackendCommunicator/graphql';
import KnowledgeFile from '../KnowledgeFile/KnowledgeFile';
import { KnowledgeFileActionCreators } from '../../redux/knowledgeFile';

function KnowledgeFileList() {
  const dispatch = useDispatch();

  const knowledgeFiles = useSelector((state) => state.knowledgeFile.byIds);
  const knowledgeFilesIds = useSelector((state) => state.knowledgeFile.allIds);

  useEffect(() => {
    loadKnowledgeFiles(
      ['.'],
      ['LAST_DATE_TIME_MODIFIED', 'DATE_TIME_CREATED'],
      ['DESC', 'DESC'],
      10,
      0
    ).then((knowledgeFiles) => {
      // Save data to redux
      for (let i = 0; i < knowledgeFiles.length; i++) {
        const knowledgeFile = knowledgeFiles[i];
        dispatch(
          KnowledgeFileActionCreators.knowledgeFileInfoLoaded(knowledgeFile)
        );
      }
    });
  }, []);

  return (
    <div className={styles.text_file_list}>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {knowledgeFilesIds.map((knowledgeFilesId, index) => {
        console.log('knowledgeFilesId: ' + knowledgeFilesId);
        return (
          <KnowledgeFile
            key={knowledgeFilesId}
            knowledgeFile={knowledgeFiles[knowledgeFilesId]}
          />
        );
      })}
    </div>
  );
}

export default KnowledgeFileList;
