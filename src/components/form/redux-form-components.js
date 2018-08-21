/* eslint-disable react/prop-types */
import React from 'react'
import { Grid, TextField } from 'material-ui'
import './redux-form-styles.css'

export class renderTextField extends React.Component {
  render() {
    const { input, label, meta: { touched, error }, ...custom } = this.props
    return (
      <Grid className="input-wrapper" container direction="column" spacing={0}>
        <TextField
          label={label}
          value={input.value}
          error={touched && !!error}
          inputProps={{ ...input, autoComplete: 'off' }}
          {...custom}
        />
        {!!touched && <Grid className="error-message">{error}</Grid>}
      </Grid>
    )
  }
}
