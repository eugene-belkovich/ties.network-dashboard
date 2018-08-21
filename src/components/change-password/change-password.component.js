import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'material-ui'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { get } from 'lodash'
import { changePassword } from '../../actions'
import { classesPropTypes, userPropTypes } from '../../prop-types'
import { ChangePasswordForm } from './'
import { Logo } from './../'
import { changePasswordSelector } from './change-password.selector'

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
  successMessage: {
    textAlign: 'center',
  },
}

@connect(changePasswordSelector)
@injectSheet(styles)
export class ChangePassword extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    classes: classesPropTypes,
    user: userPropTypes,
  }

  state = {
    serverError: null,
    changeData: null,
  }

  getContent = () => {
    const { changeData, serverError } = this.state
    const { classes, user } = this.props

    if (!changeData) {
      return (
        <Grid item className={classes.formContainer}>
          <h3>Change Password:</h3>
          <ChangePasswordForm
            onSubmit={this.submitChangePassword}
            user={user}
            serverError={serverError}
          />
        </Grid>
      )
    }

    return (
      <Grid item className={classes.formContainer}>
        <p className={classes.successMessage}>You successfully changed your password</p>
      </Grid>
    )
  }

  submitChangePassword = (body) => {
    this.setState({ serverError: null })
    this.props.dispatch(changePassword(body))
      .then((res) => {
        this.setState({ changeData: res })
      })
      .catch(error =>
        this.setState({ serverError: get(error, 'message', 'Server error, please try again') }),
      )
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
