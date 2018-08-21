import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PageWithNavbar, Login } from '../../components'

@connect()
export class LoginScreen extends Component {
  render() {
    return (
      <PageWithNavbar>
        <Login />
      </PageWithNavbar>
    )
  }
}
