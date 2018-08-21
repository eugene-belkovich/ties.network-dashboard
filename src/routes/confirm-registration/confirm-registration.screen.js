import React, { Component } from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { Grid, CircularProgress } from 'material-ui'
import { get } from 'lodash'
import queryString from 'query-string'
import { push } from 'react-router-redux'
import { confirmRegistration, resendCode, signOut } from './../../actions'
import { routerPropTypes, classesPropTypes, userPropTypes } from './../../prop-types'
import { Logo } from './../../components'
import { confirmRegistrationSelector } from './confirm-registration.selector'

const styles = {
  wrapper: {
    height: '100vh',
    width: '100%',
  },
  progressWrapper: {
    maxWidth: '320px',
  },
  progress: {
    marginBottom: '20px',
  },
  link: {
    color: '#3F51B5',
    textDecoration: 'underline',
    cursor: 'pointer',
    padding: '0 5px',
  },
}

@injectSheet(styles)
@connect(confirmRegistrationSelector)
export class ConfirmRegistrationScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    router: routerPropTypes.isRequired,
    user: userPropTypes,
    classes: classesPropTypes.isRequired,
  }

  state = {
    serverError: null,
  }

  componentDidMount() {
    const { dispatch, router } = this.props
    const query = queryString.parse(get(router, 'location.search'))
    const email = get(query, 'email')
    const code = get(query, 'code')

    dispatch(confirmRegistration(email, code))
      .then(() => dispatch(signOut()))
      .catch(err => this.setState({ serverError: get(err, 'message', 'Server error, please try again') }))
  }

  getContent = () => {
    const { serverError } = this.state
    const { classes, user, router } = this.props
    const resendError = get(user, 'resendCode.error')
    const resendIsFetching = get(user, 'resendCode.isFetching')
    const successfulResend = get(user, 'resendCode.success')
    const query = queryString.parse(get(router, 'location.search'))
    const email = get(query, 'email')

    if (serverError || resendError) {
      return (
        <Grid item className="server-error-wrapper">
          <span className="server-error-message">
            {serverError || get(resendError, 'message', 'Server error, please try again later')}
          </span>
          {!resendError && <p>We can try
            <a
              role="link"
              tabIndex={0}
              className={classes.link}
              onClick={this.dispatchResendCode}
            >
              resend
            </a>
            your code
          </p>}
        </Grid>
      )
    }

    if (successfulResend) {
      return <p>We resend new confirmation instruction to your email - ({email})</p>
    }

    return (
      <Grid
        container
        direction="column"
        align="center"
        justify="center"
        item
        className={classes.progressWrapper}
      >
        <CircularProgress className={classes.progress} />
        {!resendIsFetching && <div>Redirecting...</div>}
      </Grid>
    )
  }

  dispatchResendCode = () => {
    const { dispatch, router } = this.props
    const query = queryString.parse(get(router, 'location.search'))
    const email = get(query, 'email')

    this.setState({ serverError: null })
    dispatch(resendCode(email))
  }

  render() {
    const { classes, dispatch } = this.props

    return (
      <Grid
        container
        direction="column"
        align="center"
        justify="center"
        spacing={0}
        className={classes.wrapper}
      >
        <Logo onClick={() => dispatch(push('/login'))} />
        {this.getContent()}
      </Grid>
    )
  }
}
