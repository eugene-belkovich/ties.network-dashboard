import React from 'react'
import classNames from 'classnames'
import injectSheet from 'react-jss'
import eth from './svg/eth.svg'
import btc from './svg/btc.svg'

const styles = {
  logo: {
    width: '24px',
    height: '24px',
  },
}

export const EthIcon = injectSheet(styles)(({ className, classes }) => (
  <img src={eth} alt="logo" className={classNames(classes.logo, className)} />
))

export const BtcIcon = injectSheet(styles)(({ className, classes }) => (
  <img src={btc} alt="logo" className={classNames(classes.logo, className)} />
))
