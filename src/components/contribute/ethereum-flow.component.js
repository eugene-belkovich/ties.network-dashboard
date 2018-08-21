import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Divider } from 'material-ui'
import injectSheet from 'react-jss'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { classesPropTypes } from '../../prop-types'
import { styles } from './contribute.styles'

@injectSheet(styles)
export class EthFlow extends React.Component {
  static propTypes = {
    classes: classesPropTypes,
    userWallet: PropTypes.string,
    contractWallet: PropTypes.string,
  }

  state = {
    tabIndex: 0,
  }

  getEthereumWalletInfo = () => {
    const { userWallet, classes, contractWallet } = this.props
    if (userWallet) {
      return (
        <div className={classes.walletInfo}>
          Send ETH to the token distribution smart contract address:
          <div className={classes.sendEthAddress}>{contractWallet}</div>
          <div>
            <b>ATTENTION!</b> Send ETH <u>exactly</u> from the address you entered at STEP 1!<br />
            Also make sure you have set the sufficient gas limit and gas price,
            or your transaction can be returned by Ethereum network:
          </div>

          <Grid className={classes.ethereumInfoBlock} container direction="column" spacing={0}>
            <Grid container align="center" justify="space-between" spacing={0}>
              <div>Gas Limit</div>
              <h4>100 000</h4>
            </Grid>
            <Divider />
            <Grid container align="center" justify="space-between" spacing={0}>
              <div>Max gas price</div>
              <h4>50GWei</h4>
            </Grid>
          </Grid>

          <div>
            Check
            <Link className={classes.footerLink} to="/faq">deposit FAQ </Link>
            to find out how to set Gas limit and Gas price
          </div>
        </div>
      )
    }

    return (
      <Grid className={classes.walletInfo} container spacing={0} direction="column">
        <div className={classNames(classes.address, classes.underline)}>
          Please, enter your ETH address first
        </div>
      </Grid>
    )
  }

  render() {
    const { classes } = this.props
    return (
      <Grid className={classes.card}>
        <div className={classes.cardBigTitle}>
          Contribute using Ethereum
        </div>
        <Grid container direction="column" spacing={0}>
          {this.getEthereumWalletInfo()}
        </Grid>
      </Grid>
    )
  }
}
