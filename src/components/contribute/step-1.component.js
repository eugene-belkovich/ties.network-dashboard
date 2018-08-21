import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography, TextField, Button, CircularProgress } from 'material-ui'
import { connect } from 'react-redux'
import { trim } from 'lodash'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { classesPropTypes } from '../../prop-types'
import { setEthereumWallet } from '../../actions'
import { Callout, SetWalletModal } from '../'
import { styles } from './contribute.styles'
import { isEthAddress } from '../../utils'
import { dashboardSelector } from '../../routes/dashboard/dashboard.selector'

@connect(dashboardSelector)
@injectSheet(styles)
export class Step1 extends React.Component {
  static propTypes = {
    classes: classesPropTypes,
    ethAddress: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  state = {
    ethAddress: null,
    isValid: false,
    isDialogOpen: false,
  }

  onAddressSubmit = () => {
    this.setState({ isDialogOpen: true })
  }

  onAddressChange = (event) => {
    const ethAddress = event.target.value
    const isValid = isEthAddress(ethAddress)
    this.setState({ ethAddress, isValid })
  }

  onDialogCancel = () => {
    this.setState({ isDialogOpen: false })
  }

  onDialogSubmit = () => {
    const { ethAddress } = this.state
    const { dispatch } = this.props
    dispatch(setEthereumWallet(ethAddress))
    this.setState({ isDialogOpen: false })
  }

  getEthAddressFiled = () => {
    const { ethAddress, classes, isFetching } = this.props
    if (isFetching) {
      return (
        <Grid container spacing={0} justify="center">
          <CircularProgress />
        </Grid>
      )
    }
    if (ethAddress) {
      return (
        <Grid container spacing={0} direction="column">
          <Typography type="caption">
            ETH Address
          </Typography>
          <div className={classNames(classes.address, classes.underline)}>{ethAddress}</div>
        </Grid>
      )
    }
    return (
      <Grid container spacing={0} align="center">
        <TextField
          label="ETH Address"
          placeholder="Ethereum address 0xABCDEF..."
          onInput={(e) => { e.target.value = trim(e.target.value) }}
          defaultValue={ethAddress}
          onChange={this.onAddressChange}
          className={classes.address}
          margin="normal"
        />
        <Button
          raised
          color="primary"
          disabled={Boolean(ethAddress) || !this.state.isValid}
          onClick={() => this.onAddressSubmit()}
        >
          Save
        </Button>
      </Grid>
    )
  }

  render() {
    const { classes } = this.props
    const { isDialogOpen, ethAddress } = this.state
    return (
      <Grid container className={classes.wrapper} direction="column" spacing={0}>
        <div className={classes.instruction}>
          <a target="_blank" key="youtube" href={'https://www.youtube.com/watch?v=P3MzNR721FU'} >
            <i className="fa fa-play-circle fa-2" aria-hidden="true" /> Watch the video instruction
          </a>
        </div>
        <Grid item className={classes.titleName}>
          Step 1.
          <span className={classes.titleText}>
              Enter the Ethereum address for receiving TIE tokens
          </span>
        </Grid>
        <Grid className={classes.card}>
          <Grid container direction="column" spacing={0}>
            <div className={classes.cardTitle}>
              Please, enter your own ETH address with access to the private key - TIE tokens
              will be issued to this address immediately after transaction have been processed.
            </div>
            {this.getEthAddressFiled()}
            <Callout title="IMPORTANT!" color="#174DA1">
              <div className={classes.calloutText}>
                DO NOT USE your cryptoexchange ETH wallet address or ETH
                address created with Ethereum client with no access to private key
                (freewallet.org, coinbase or online Ethereum wallets)!
              </div>
              <div className={classes.calloutText}>
                If you don&apos;t have the private key of this ETH address, you will not have access
                to your TIE tokens!
              </div>
            </Callout>
          </Grid>
          <Grid item className={classes.cardFooter}>
            You can create an Ethereum address using
            <a className={classes.footerLink} target="_blank" href="https://www.myetherwallet.com/">
              MyEtherWallet.com
            </a>,
            <a className={classes.footerLink} target="_blank" href="https://metamask.io/">
              Metamask
            </a>,
            <a className={classes.footerLink} target="_blank" href="https://github.com/ethereum/mist/releases">
              Mist
            </a>
          </Grid>
        </Grid>
        <SetWalletModal
          ethAddress={ethAddress}
          isOpen={isDialogOpen}
          onCancel={this.onDialogCancel}
          onSubmit={this.onDialogSubmit}
        />
      </Grid>
    )
  }
}
