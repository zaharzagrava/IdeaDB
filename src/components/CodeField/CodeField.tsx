import React, { ReactElement } from 'react';
import { Field, FieldProps } from 'formik';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-github';

interface Props {
  label: string;
  name: string;
}

function CodeField({ label, name }: Props): ReactElement {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        return (
          <div id={name}>
            <AceEditor
              mode="yaml"
              theme="github"
              name={name}
              maxLines={Infinity}
              tabSize={2}
              showGutter={false}
              highlightActiveLine={false}
              width={'100%'}
              onChange={(event, editor) => {
                // console.log("@onChange")

                form.setFieldValue(name, event);
              }}
              onBlur={(event, editor) => {
                // console.log("@onBlur")

                form.setFieldTouched(name, true);
              }}
              value={field.value}
            />
          </div>
        );
      }}
    </Field>
  );
}

export default CodeField;
