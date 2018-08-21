import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Button, CircularProgress } from 'material-ui'
import { connect } from 'react-redux'
import { get } from 'lodash'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { classesPropTypes, userStatusPropTypes } from '../../prop-types'
import { generateBitcoinWallet, expireBtcAddress } from '../../actions'
import { BtcCountdown } from '../../components'
import { styles } from './contribute.styles'
import { bitcoinFlowSelector } from './bitcoin-flow.selector'

@injectSheet(styles)
@connect(bitcoinFlowSelector)
export class BtcFlow extends React.Component {
  static propTypes = {
    classes: classesPropTypes,
    dispatch: PropTypes.func.isRequired,
    userStatus: PropTypes.shape({ data: userStatusPropTypes }),
    bitcoin: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  }

  state = {
    tabIndex: 0,
  }

  getBtcWalletStatus = () => {
    const { classes, userStatus, bitcoin, dispatch } = this.props
    const btcWallet = get(userStatus, 'data.btcWallet')
    const assignedAt = get(userStatus, 'data.btcWalletAssignedAt')
    const btcWalletLockedForever = get(userStatus, 'data.btcWalletLockedForever') === 'true'
    if (userStatus.isFetching || bitcoin.isFetching) {
      return (
        <Grid container spacing={0} justify="center" className={classes.sendEthAddress}>
          <CircularProgress />
        </Grid>
      )
    }

    if (btcWallet && (!bitcoin.isExpired || btcWalletLockedForever)) {
      return (
        <div>
          <div className={classes.sendEthAddress}>{btcWallet}</div>
          {(assignedAt && !btcWalletLockedForever) &&
          <BtcCountdown
            endDate={new Date(assignedAt).getTime() + (1000 * 60 * 20)}
            onExpire={() => dispatch(expireBtcAddress)}
          />
          }
        </div>
      )
    }

    return (
      <Grid container spacing={0} justify="center" className={classes.sendEthAddress}>
        <Button
          raised
          color="primary"
          disabled={(btcWallet && !bitcoin.isExpired) || bitcoin.isFetching}
          onClick={this.generateAddress}
        >
          Generate
        </Button>
        {bitcoin.error &&
        <Grid item xs={12} className={classNames('server-error-message', classes.error)}>
          {get(bitcoin.error, 'errorMessage', 'Server error, please try again later')}
        </Grid>
        }
      </Grid>
    )
  }

  getBitcoinWalletInfo = () => {
    const { userStatus, classes } = this.props
    const etherWallet = get(userStatus, 'data.etherWallet')
    if (etherWallet) {
      return (
        <div className={classes.walletInfo}>
          Send BTC to your personal BTC deposit address:
          <Grid>
            {this.getBtcWalletStatus()}
          </Grid>
          <p>
            You will get your TIE tokens as soon as your BTC transaction is confirmed by 3 blocks.
          </p>
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

  generateAddress = () => {
    const { dispatch } = this.props
    dispatch(generateBitcoinWallet())
  }

  render() {
    const { classes } = this.props
    return (
      <Grid className={classes.card}>
        <div className={classes.cardBigTitle}>
          Contribute using Bitcoin
        </div>
        <Grid container direction="column" spacing={0}>
          {this.getBitcoinWalletInfo()}
        </Grid>
      </Grid>
    )
  }
}
