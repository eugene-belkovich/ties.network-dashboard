/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { LinearProgress } from 'material-ui'
import jss from 'jss'
import jssNested from 'jss-nested'
import {
  LoginScreen,
  NotFound,
  SignUpScreen,
  ConfirmRegistrationScreen,
  DashboardScreen,
  ForgotPasswordScreen,
  SettingsScreen,
  InvitesScreen,
  FAQ,
  AdminScreen,
} from './routes'
import { loadCognitoUser } from './utils'
import { setCognitoUser } from './actions'
import { ApplicationSelector } from './application.selector'
import './styles/index.css'
import './styles/app.css'

// Use plugins.
jss.use(jssNested())

@connect(ApplicationSelector)
export default class Application extends React.Component {
  state = {
    isLoaded: false,
  }

  componentDidMount() {
    const { dispatch } = this.props
    loadCognitoUser()
      .then(cognitoUser => dispatch(setCognitoUser(cognitoUser)))
      .catch(e => e)
      // eslint-disable-next-line react/no-did-mount-set-state
      .then(this.setState({ isLoaded: true }))
  }

  getRoutes = () => {
    const { isLoggedIn, isAdmin } = this.props.user
    if (isLoggedIn) {
      return (
        <Switch>
          <Route exact path="/" component={DashboardScreen} />
          <Route exact path="/login" component={DashboardScreen} />
          <Route exact path="/signup" component={DashboardScreen} />
          <Route exact path="/forgot-password" component={DashboardScreen} />
          <Route exact path="/settings" component={SettingsScreen} />
          <Route exact path="/invites" component={InvitesScreen} />
          <Route exact path="/faq" component={FAQ} />
          {isAdmin && <Route exact path="/admin" component={AdminScreen} />}
          <Route component={NotFound} />
        </Switch>
      )
    }
    return (
      <Switch>
        <Route exact path="/" component={LoginScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/signup" component={SignUpScreen} />
        <Route path="/forgot-password" component={ForgotPasswordScreen} />
        <Route path="/confirm-registration" component={ConfirmRegistrationScreen} />
        <Route exact path="/faq" component={FAQ} />
        <Route component={NotFound} />
      </Switch>
    )
  }

  render() {
    const { isLoaded } = this.state
    if (isLoaded) {
      return (
        <ConnectedRouter history={this.props.history}>
          {this.getRoutes()}
        </ConnectedRouter>
      )
    }
    return <LinearProgress />
  }
}
