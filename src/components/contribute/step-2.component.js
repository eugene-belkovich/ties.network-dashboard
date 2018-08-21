import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Tabs, Tab } from 'material-ui'
import injectSheet from 'react-jss'
import { classesPropTypes } from '../../prop-types'
import { styles } from './contribute.styles'
import { EthIcon, BtcIcon, EthFlow, BtcFlow } from './../'

@injectSheet(styles)
export class Step2 extends React.Component {
  static propTypes = {
    classes: classesPropTypes,
    userWallet: PropTypes.string,
    contractWallet: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
  }

  state = {
    tabIndex: 0,
  }

  getContent = () => {
    const { isOpen, classes, contractWallet, userWallet } = this.props
    if (isOpen) {
      return (
        <div>
          <Tabs indicatorColor="#174DA1" fullWidth value={this.state.tabIndex} onChange={this.handleChange}>
            <Tab classes={{ root: classes.tabRoot }} icon={<EthIcon />} label="Ethereum" />
            <Tab classes={{ root: classes.tabRoot }} icon={<BtcIcon />} label="Bitcoin" />
          </Tabs>

          {this.state.tabIndex === 0 &&
          <EthFlow contractWallet={contractWallet} userWallet={userWallet} />
          }

          {this.state.tabIndex === 1 &&
          <BtcFlow />
          }
        </div>
      )
    }

    return (
      <Grid className={classes.closedCard} container spacing={0} align="center" justify="center">
        <p>Token Sale is CLOSED. Thank you for your contribution!</p>
      </Grid>
    )
  }

  handleChange = (event, tabIndex) => {
    this.setState({ tabIndex })
  }

  render() {
    const { classes } = this.props
    return (
      <Grid container className={classes.wrapper} direction="column" spacing={0}>
        <Grid className={classes.titleName}>
          Step 2.
          <span className={classes.titleText}>
            Contribute using Ethereum or Bitcoin
          </span>
        </Grid>
        {this.getContent()}
      </Grid>
    )
  }
}
