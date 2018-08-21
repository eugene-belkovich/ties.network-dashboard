/* eslint-disable react/prop-types */
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Grid, CircularProgress } from 'material-ui'
import { get } from 'lodash'
import { renderTextField } from './../form'

const validate = (values) => {
  const errors = {}
  const requiredFields = ['email']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z0-9.-]+$/i.test(values.email)) {
    errors.email = 'Must be a valid email address'
  }

  return errors
}

@reduxForm({ form: 'ForgotPassword', validate })
export class ForgotPasswordForm extends React.Component {
  getServerError() {
    const { serverError } = this.props
    if (serverError) {
      return (
        <Grid item className="server-error-wrapper">
          <span className="server-error-message">
            {serverError}
          </span>
        </Grid>
      )
    }
    return <Grid item />
  }

  getButtons() {
    const { pristine, submitting, valid, user } = this.props
    if (!get(user, 'isFetching')) {
      return (
        <Button raised color="primary" type="submit" disabled={pristine || submitting || !valid}>
          Reset Password
        </Button>
      )
    }
    return <CircularProgress />
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Grid item>
          <Field name="email" component={renderTextField} label="Email" />
        </Grid>
        {this.getServerError()}
        <Grid container justify="center" spacing={0}>
          {this.getButtons()}
        </Grid>
      </form>
    )
  }
}
