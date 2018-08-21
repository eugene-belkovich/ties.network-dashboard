import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import { loginUser } from '../../actions'
import { userPropTypes } from '../../prop-types'
import { LoginForm } from './login-form'
import { Logo, YoutubeVideo } from './../'
import { loginSelector } from './login.selector'
import './styles.css'

const styles = {
  loginWrapper: {
    padding: '40px 0',
    minHeight: 'calc(100vh - 64px)',
    width: '100%',
  },
  loginContainer: {
    maxWidth: 320,
    width: '100%',
    padding: '0 20px',
  },
}

@connect(loginSelector)
@injectSheet(styles)
export class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: userPropTypes,
  }

  state = {
    serverError: null,
  }

  submit = (body) => {
    this.setState({ serverError: null })
    this.props.dispatch(loginUser(body))
      .catch(error =>
        this.setState({ serverError: get(error, 'message', 'Server error, please try again') }),
      )
  }

  render() {
    const { user } = this.props
    return (
      <div className="login-block">
        <div className="login-container">
          <Logo />
          <LoginForm
            onSubmit={this.submit}
            user={user}
            serverError={this.state.serverError}
          />
          <p>
            New user? <Link to="/signup">Sign up </Link>to create your account
          </p>
        </div>
        <div className="youtube-block">
          <YoutubeVideo source="https://www.youtube.com/watch?v=P3MzNR721FU" />
        </div>
      </div>
    )
  }
}
