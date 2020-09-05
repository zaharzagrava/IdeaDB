import React from 'react'
import { Field } from 'formik'

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-github";

function CodeField({label, name}) {
  return (
    <Field name={name}>
      {
        ({field, form}) => {
          return <AceEditor mode="yaml"
                            theme="github"
                            id={name}
                            name={name}
                            maxLines={Infinity}
                            tabSize={2}
                            showGutter={false}
                            highlightActiveLine={false}
                            width={"100%"}
                            onChange={(event, editor) => {
                              // console.log("@onChange")

                              form.setFieldValue(name, event);
                            }}
                            onBlur={(event, editor) => {
                              // console.log("@onBlur")

                              form.setFieldTouched(name, true);
                            }}
                            value={field.value}/>
        }
      }
    </Field>
  )
}

export default CodeField
