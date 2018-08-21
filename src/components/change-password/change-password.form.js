/* eslint-disable react/prop-types */
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Grid, CircularProgress } from 'material-ui'
import { get } from 'lodash'
import { renderTextField } from './../form'

const validate = (values) => {
  const errors = {}
  const requiredFields = ['password', 'repeatPassword', 'oldPassword']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  if (values.password && values.password.length < 8) {
    errors.password = 'Use at least 8 characters'
  }

  if (values.password !== values.repeatPassword) {
    errors.repeatPassword = 'Please ensure that your password and your confirm password are the same.'
  }

  return errors
}

@reduxForm({ form: 'ChangePasswordForm', validate })
export class ChangePasswordForm extends React.Component {

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
    return <Grid item className="errorPlaceholder" />
  }

  getButtons() {
    const { pristine, submitting, valid, user } = this.props
    if (!get(user, 'isFetching')) {
      return (
        <Button raised color="primary" type="submit" disabled={pristine || submitting || !valid}>
          Set New Password
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
          <Field
            component={renderTextField}
            label="Old password"
            type="password"
            name="oldPassword"
          />
        </Grid>

        <Grid item>
          <Field
            component={renderTextField}
            label="New password"
            type="password"
            name="password"
          />
        </Grid>

        <Grid item>
          <Field
            component={renderTextField}
            label="Repeat password"
            type="password"
            name="repeatPassword"
          />
        </Grid>

        {this.getServerError()}
        <Grid container justify="center" spacing={0}>
          {this.getButtons()}
        </Grid>
      </form>
    )
  }
}
