import React, { ReactElement } from 'react';
import KnowledgeFilesPage from './components/KnowledgeFilesPage/KnowledgeFilesPage';

interface Props {}

function App({}: Props): ReactElement {
  return (
    <>
      <KnowledgeFilesPage></KnowledgeFilesPage>
    </>
  );
}

export default App;
