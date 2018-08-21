import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'material-ui'
import { get, round } from 'lodash'
import injectSheet from 'react-jss'
import { classesPropTypes, contractStatusPropTypes } from '../../prop-types'
import { List, CountdownList } from '../'
import { styles } from './tokens-info.styles'
import { weiToEth } from '../../utils'

@injectSheet(styles)
export class TokensInfo extends React.Component {
  static propTypes = {
    classes: classesPropTypes,
    contractStatus: contractStatusPropTypes,
    balance: PropTypes.number,
  }

  getTotalRaised = () => {
    const { contractStatus } = this.props
    const ethRate = get(contractStatus, 'ethRate', 1)
    const btcRate = get(contractStatus, 'btcRate', 1)
    const totalEthInvested = get(contractStatus, 'totalEthInvested', 0)
    const totalBtcInvested = get(contractStatus, 'totalBtcInvested', 0)
    const result = ((totalEthInvested / weiToEth) * ethRate) + (totalBtcInvested * btcRate)
    return round(result, 2).toLocaleString()
  }

  render() {
    const { classes, contractStatus, balance } = this.props
    const currentBonus = get(contractStatus, 'currentBonus', '')
    const totalEthInvested = get(contractStatus, 'totalEthInvested', 0)
    const totalBtcInvested = get(contractStatus, 'totalBtcInvested', 0)
    const totalSupply = get(contractStatus, 'totalSupply', 0)
    const endTimestamp = get(contractStatus, 'endTimestamp', 0)
    const convertedBalance = round(balance / weiToEth, 2).toLocaleString()
    return (
      <Grid container direction="column" spacing={0}>
        <Grid hidden={{ smDown: true }}>
          <List
            className={classes.wrapper}
            textClasses={{ root: classes.tokenBalance }}
            data={[{ primary: 'Your TIE tokens balance', secondary: `${convertedBalance} TIE` }]}
          />
        </Grid>
        <CountdownList currentBonus={currentBonus} endDate={endTimestamp} />
        <List
          className={classes.wrapper}
          textClasses={{ root: classes.tiesInfo }}
          data={[
            {
              primary: 'TIE tokens sold',
              secondary: `${(round(totalSupply / weiToEth, 2).toLocaleString())} / ${Number(140000000).toLocaleString()} TIE`,
            },
            {
              primary: 'Total funds raised',
              secondary: `${this.getTotalRaised()} / ${Number(33600000).toLocaleString()} $`,
            },
            { primary: 'Total BTC raised', secondary: round(totalBtcInvested, 2).toLocaleString() },
            { primary: 'Total ETH raised', secondary: round(totalEthInvested / weiToEth, 2).toLocaleString() },
          ]}
        />
      </Grid>
    )
  }
}
