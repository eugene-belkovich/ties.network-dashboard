import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid } from 'material-ui'
import { get, round, toUpper } from 'lodash'
import injectSheet from 'react-jss'
import {
  fetchUserStatus,
  fetchContractStatus,
  fetchTransactionList,
} from '../../actions'
import {
  PageWithNavbar,
  Step1,
  Step2,
  TokensInfo,
  TransactionsTable,
  Calculator,
  List,
  CountryWarning,
} from '../../components'
import { classesPropTypes, contractStatusPropTypes, userStatusPropTypes } from '../../prop-types'
import { dashboardSelector } from './dashboard.selector'
import { isVisible, weiToEth } from '../../utils'

const styles = {
  stepsWrapper: {
    padding: 20,
  },
  tokensWrapper: {
    padding: '20px 20px 20px 0',
  },
  tokenBalance: {
    '& p': {
      fontSize: 22,
      lineHeight: '22px',
      fontFamily: 'AvenirNextLTPro-Demi',
      color: '#000000',
    },
  },
  '@media (max-width: 959.5px )': {
    tokensWrapper: {
      padding: 20,
    },
  },
}

const UPDATE_TRANSACTIONS_INTERVAL = 25000

@injectSheet(styles)
@connect(dashboardSelector)
export class DashboardScreen extends React.Component {
  static propTypes = {
    classes: classesPropTypes,
    dispatch: PropTypes.func.isRequired,
    contract: PropTypes.shape({ data: contractStatusPropTypes }),
    userStatus: PropTypes.shape({ data: userStatusPropTypes }),
    transactions: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchUserStatus())
    dispatch(fetchContractStatus())
    dispatch(fetchTransactionList())
    this.updateTransactions = setInterval(this.onUpdateInterval, UPDATE_TRANSACTIONS_INTERVAL)
  }

  componentWillUnmount() {
    clearInterval(this.updateTransactions)
  }

  onUpdateInterval = () => {
    const { transactions: { isAutoUpdateEnabled }, dispatch } = this.props
    if (isVisible() && isAutoUpdateEnabled) {
      dispatch(fetchTransactionList())
      dispatch(fetchUserStatus())
      dispatch(fetchContractStatus())
    }
  }

  getContributeContent = () => {
    const { classes, userStatus, contract } = this.props
    const userWallet = get(userStatus, 'data.etherWallet')
    const balance = get(userStatus, 'data.balance', 0)
    const convertedBalance = round(balance / weiToEth, 2).toLocaleString()
    const contractAddress = get(contract, 'data.contractAddress')
    const isOpen = get(contract, 'data.isOpen', true)
    const country = get(userStatus, 'data.country', '')

    if (toUpper(country) === 'US' && !userStatus.usAccess) {
      return (
        <Grid className={classes.stepsWrapper} item xs={12} md={7}>
          <CountryWarning />
        </Grid>
      )
    }

    return (
      <Grid className={classes.stepsWrapper} item xs={12} md={7}>
        <Grid hidden={{ mdUp: true }}>
          <List
            className={classes.wrapper}
            textClasses={{ root: classes.tokenBalance }}
            data={[{ primary: 'Your TIE tokens balance', secondary: `${convertedBalance} TIE` }]}
          />
        </Grid>
        <TransactionsTable />
        <Step1 ethAddress={userWallet} isFetching={userStatus.isFetching} />
        <Step2 isOpen={isOpen} userWallet={userWallet} contractWallet={contractAddress} />
      </Grid>
    )
  }

  render() {
    const { classes, contract, userStatus } = this.props
    const balance = get(userStatus, 'data.balance', 0)

    return (
      <PageWithNavbar>
        <Grid container spacing={0}>
          {this.getContributeContent()}
          <Grid className={classes.tokensWrapper} item xs={12} md={5}>
            <TokensInfo balance={balance} contractStatus={contract.data} />
            <Calculator />
          </Grid>
        </Grid>
      </PageWithNavbar>
    )
  }
}
