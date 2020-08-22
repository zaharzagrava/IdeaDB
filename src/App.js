import React, { useState } from 'react';

import Searchbar from "./components/Searchbar/Searchbar";
import TextFileList from "./components/TextFileList/TextFileList";

function App() {

  return (
    <>
      <Searchbar />
      <TextFileList />
    </>
  );
}

export default App;
