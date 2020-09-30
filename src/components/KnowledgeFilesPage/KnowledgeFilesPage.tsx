import React, { ReactElement } from 'react';

import SearchBar from '../SearchBar/SearchBar';
import KnowledgeFileList from '../KnowledgeFileList/KnowledgeFileList';

interface Props {}

function KnowledgeFilesPage({}: Props): ReactElement {
  return (
    <>
      <SearchBar />
      <KnowledgeFileList />
    </>
  );
}

export default KnowledgeFilesPage;
