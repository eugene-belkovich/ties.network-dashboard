import React, { Component } from 'react'
import { PageWithNavbar, AdminSetting } from '../../components'

export class AdminScreen extends Component {
  render() {
    return (
      <PageWithNavbar>
        <AdminSetting />
      </PageWithNavbar>
    )
  }
}
