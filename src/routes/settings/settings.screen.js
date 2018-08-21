import React, { Component } from 'react'
import { PageWithNavbar, ChangePassword } from '../../components'

export class SettingsScreen extends Component {
  render() {
    return (
      <PageWithNavbar>
        <ChangePassword />
      </PageWithNavbar>
    )
  }
}
