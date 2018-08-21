import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { get } from 'lodash'
import injectSheet from 'react-jss'
import { Grid } from 'material-ui'
import { Link } from 'react-router-dom'
import { registerUser } from '../../actions'
import { classesPropTypes, userPropTypes } from '../../prop-types'
import SignUpForm from './signup-form'
import { Logo, YoutubeVideo } from '../'
import { signUpSelector } from './signup.selector'


const styles = {
  signUpWrapper: {
    padding: '40px 0',
    minHeight: 'calc(100vh - 64px)',
    width: '100%',
  },
  signUpContainer: {
    maxWidth: 320,
    width: '100%',
    padding: '0 20px',
  },
}

@connect(signUpSelector)
@injectSheet(styles)
export class SignUp extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    classes: classesPropTypes,
    user: userPropTypes,
  }

  state = {
    serverError: null,
    registrationData: null,
  }

  getContent = () => {
    const { registrationData, serverError } = this.state
    const { classes, user } = this.props

    if (!registrationData) {
      return (
        <Grid className={classes.signUpContainer} item>
          <h2>Create a Ties.Network account</h2>
          <SignUpForm
            onSubmit={this.submit}
            user={user}
            serverError={serverError}
          />

          <p>
            Already have an account?
            <Link to="/login"> Sign in </Link>
          </p>
        </Grid>
      )
    }

    return (
      <Grid item>
        You successfully registered on Ties.network. Please check your
        email {get(registrationData, 'username')} and confirm registration
      </Grid>
    )
  }

  submit = (body) => {
    this.setState({ serverError: null })
    this.props.dispatch(registerUser(body))
      .then((res) => {
        this.setState({ registrationData: res })
      })
      .catch(error =>
        this.setState({ serverError: get(error, 'message', 'Server error, please try again') }),
      )
  }

  render() {
    return (
      <div className="login-block">
        <div className="login-container">
          <Logo />
          {this.getContent()}
        </div>
        <div className="youtube-block">
          <YoutubeVideo source="https://www.youtube.com/watch?v=P3MzNR721FU" />
        </div>
      </div>
    )
  }
}
