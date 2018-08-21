import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PageWithNavbar, ForgotPassword } from '../../components'

@connect()
export class ForgotPasswordScreen extends Component {
  render() {
    return (
      <PageWithNavbar>
        <ForgotPassword />
      </PageWithNavbar>
    )
  }
}
