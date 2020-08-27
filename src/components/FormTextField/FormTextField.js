import React from 'react'
import { Field } from 'formik'
import { TextField } from '@material-ui/core'

function FormTextField({label, name, helperText}) {
  return (
    <Field name={name}>
      {
        ({field, form}) => {
          return <TextField type="text"
                            id={name}
                            name={name}
                            label={label}
                            error={form.errors[name] && form.touched[name]}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            value={field.value}
                            helperText={form.errors[name] ? form.errors[name] : helperText}/>
        }
      }
    </Field>
  )
}

export default FormTextField
