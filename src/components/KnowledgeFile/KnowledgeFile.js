import React, { useState } from 'react'

import { Card } from "@material-ui/core";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";

import './KnowledgeFileContent.css'

function KnowledgeFile({knowledge_file}) {
  const [text, setText] = useState('')
  
  return (
    <Card>
      <div className="editor">
        <CKEditor
          editor={ClassicEditor}
          data={text}
          config={{

          }}
          onChange={(event, editor) => {
            const data = editor.getData();

            setText(data);
          }}/>
      </div>
      <div>
        <h2>Content</h2>
        <p>{text}</p>
      </div>
    </Card>

  )
}

export default KnowledgeFile
