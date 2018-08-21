import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid } from 'material-ui'
import { connect } from 'react-redux'
// import { fetchUser } from '../../actions'

@connect()
export class LoginWith extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  static instance = null
  static timer = null

  openLoginPopUp(loginUrl) {
    if (LoginWith.instance) {
      LoginWith.instance.close()
      clearInterval(LoginWith.timer)
    }

    LoginWith.instance = window.open(loginUrl, '', 'top=100,left=100,width=500,height=500')
    LoginWith.timer = setInterval(() => {
      const { instance, timer } = LoginWith
      if (!instance || instance.closed) {
        clearInterval(timer)
        return
      }
      try {
        if (instance.document.URL.includes('/redirect-auth')) {
          // this.props.dispatch(fetchUser())
          clearInterval(timer)
          instance.close()
        }
      } catch (e) {
        if (!instance || instance.closed) {
          clearInterval(timer)
        }
      }
    }, 150)
  }

  googleLogin = () => this.openLoginPopUp('/auth/google')
  facebookLogin = () => this.openLoginPopUp('/auth/facebook')
  vkLogin = () => this.openLoginPopUp('/auth/vkontakte')

  render() {
    return (
      <Grid
        className="loginWithContent"
        container
        direction="column"
        align="center"
        justify="flex-start"
        spacing={0}
      >
        <Grid item className="contentItem">
          <Button className="googleButton" onClick={this.googleLogin} disableFocusRipple>
            LOGIN WITH GOOGLE
          </Button>
        </Grid>
        <Grid item className="contentItem">
          <Button
            className="facebookButton"
            onClick={this.facebookLogin}
            disableFocusRipple
          >
            LOGIN WITH FACEBOOK
          </Button>
        </Grid>
        <Grid item className="contentItem">
          <Button className="vkButton" onClick={this.vkLogin} disableFocusRipple>
            LOGIN WITH VK
          </Button>
        </Grid>
      </Grid>
    )
  }
}
