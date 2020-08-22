import React from 'react'

import styles from "./TextFileList.module.scss";

import TextFile from "../TextFile/TextFile";

function TextFileList() {
  return (
    <div className={styles.text_file_list}> 
      <TextFile />
      <TextFile />
      <TextFile />
    </div>
  )
}

export default TextFileList
