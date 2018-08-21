import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Snackbar } from 'material-ui'
import { get } from 'lodash'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { classesPropTypes, userPropTypes, contractStatusPropTypes } from '../../prop-types'
import { AdminSettingsForm } from './'
import { Logo } from './../'
import { adminSettingSelector } from './admin-settings.selector'
import { updateContractStatus } from './../../actions'

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

@connect(adminSettingSelector)
@injectSheet(styles)
export class AdminSetting extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    classes: classesPropTypes,
    user: userPropTypes,
    contract: PropTypes.shape({ data: contractStatusPropTypes }),
  }

  state = {
    serverError: null,
    snackbarOpen: false,
    snackbarMessage: '',
  }

  getContent = () => {
    const { serverError } = this.state
    const { classes, user, contract } = this.props

    return (
      <Grid item className={classes.formContainer}>
        <h3>Admin settings</h3>
        <AdminSettingsForm
          contract={contract}
          onSubmit={this.submitChangeSettings}
          user={user}
          serverError={serverError}
        />
      </Grid>
    )
  }

  submitChangeSettings = (body) => {
    const { dispatch } = this.props
    this.setState({ serverError: null })
    dispatch(updateContractStatus(body))
      .then(() => this.setState({ snackbarOpen: true, snackbarMessage: 'Settings Successfully Updated' }))
      .catch(error =>
        this.setState({ serverError: get(error, 'errorMessage', 'Server error, please try again') }),
      )
  }

  handleSnackbarRequestClose = () => {
    this.setState({ snackbarOpen: false })
  }

  render() {
    const { classes } = this.props
    const { snackbarMessage, snackbarOpen } = this.state
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
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          open={snackbarOpen}
          onRequestClose={this.handleSnackbarRequestClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{snackbarMessage}</span>}
        />
      </Grid>
    )
  }
}
