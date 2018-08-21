import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'material-ui'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { get } from 'lodash'
import { push } from 'react-router-redux'
import { forgotPassword, confirmPassword } from '../../actions'
import { classesPropTypes, userPropTypes } from '../../prop-types'
import { ForgotPasswordForm, NewPasswordForm } from './'
import { Logo } from './../'
import { forgotPasswordSelector } from './forgot-password.selector'

const styles = {
  formWrapper: {
    padding: '40px 0',
    minHeight: 'calc(100vh - 64px)',
    width: '100%',
  },
  formContainer: {
    maxWidth: 320,
    width: '100%',
    padding: '0 20px',
  },
}

@connect(forgotPasswordSelector)
@injectSheet(styles)
export class ForgotPassword extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    classes: classesPropTypes,
    user: userPropTypes,
  }

  state = {
    serverError: null,
    resetData: null,
  }

  getContent = () => {
    const { resetData, serverError } = this.state
    const { classes, user } = this.props

    if (!resetData) {
      return (
        <Grid item className={classes.formContainer}>
          <p>Please, provide your email, to reset your password </p>
          <ForgotPasswordForm
            onSubmit={this.submitForgotPassword}
            user={user}
            serverError={serverError}
          />
        </Grid>
      )
    }

    return (
      <Grid item className={classes.formContainer}>
        <p>We sent you email to {get(resetData, 'username')} with verification code.
          Please, provide your code and set your new password.</p>
        <NewPasswordForm
          onSubmit={this.submitNewPassword}
          user={user}
          serverError={serverError}
        />
      </Grid>
    )
  }

  submitForgotPassword = (body) => {
    this.setState({ serverError: null })
    this.props.dispatch(forgotPassword(body))
      .then((res) => {
        this.setState({ resetData: res })
      })
      .catch(error =>
        this.setState({ serverError: get(error, 'message', 'Server error, please try again') }),
      )
  }

  submitNewPassword = (body) => {
    const { dispatch } = this.props
    this.setState({ serverError: null })
    dispatch(confirmPassword({ ...body, email: get(this.state.resetData, 'username') }))
      .then(() => dispatch(push('/login')))
      .catch((error) => {
        this.setState({ serverError: get(error, 'message', 'Server error, please try again') })
      })
  }

  render() {
    const { classes } = this.props
    return (
      <Grid
        container
        direction="column"
        align="center"
        justify="center"
        className={classes.formWrapper}
        spacing={0}
      >
        <Logo />
        {this.getContent()}
      </Grid>
    )
  }
}
