import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles, Grid, LinearProgress, Switch, Typography } from 'material-ui'
import { connect } from 'react-redux'
import { isEmpty, isEqual, filter, compact, reduce, orderBy, map } from 'lodash'
import Collapse from 'material-ui/transitions/Collapse'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import IconButton from 'material-ui/IconButton'
import { transactionsInfoSelector } from './transactions-info.selector'
import { fetchTransactionList, fetchContractStatus, changeAutoUpdate, fetchUserStatus } from '../../actions'
import { weiToEth } from '../../utils'

const styles = theme => ({
  paper: {
    width: '100%',
    marginTop: 10,
    paddingTop: 7,
    backgroundColor: 'white',
    overflowX: 'auto',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  tableHeader: {
    marginLeft: 16,
    lineHeight: '22px',
    fontFamily: 'AvenirNextLTPro-Demi',
  },
  tableSubHeader: {
    marginLeft: 16,
    marginTop: 16,
    lineHeight: '22px',
    fontSize: 14,
    fontFamily: 'AvenirNextLTPro-Demi',
  },
  confirmTd: {
    maxWidth: 50,
    padding: '0 0 0 24px',
  },
  dateTd: {
    maxWidth: 70,
    minWidth: 70,
    padding: '0 0 0 24px',
  },
  amountTd: {
    maxWidth: 70,
    padding: '0 0 0 24px',
  },
  hashTd: {
    maxWidth: '12vw',
    wordWrap: 'break-all',
  },
  refreshIcon: {
    fontSize: 16,
  },
  autoUpdate: {
    fontSize: 14,
    fontFamily: 'AvenirNextLTPro',
  },
  collapseContent: {
    overflow: 'auto',
  },
})

@withStyles(styles)
@connect(transactionsInfoSelector)
export class TransactionsTable extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    transactions: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  state = {
    expanded: false,
    isFetching: false,
  }

  componentWillReceiveProps(nextProps) {
    const { transactions } = this.props
    const nextTransactions = this.getAllTransactions(nextProps.transactions.data)
    const currentTransactions = this.getAllTransactions(transactions.data)
    if (!isEqual(currentTransactions, nextTransactions) && transactions.data) {
      this.setState({ expanded: true })
    }
    if (!transactions.isFetching && nextProps.transactions.isFetching) {
      this.setState({ isFetching: true })
      setTimeout(() => {
        if (!this.unMounted) {
          this.setState({ isFetching: false })
        }
      }, 3000)
    }
  }

  componentWillUnmount() {
    this.unMounted = true
  }

  getAllTransactions = transactions => compact(reduce(transactions, (acc, t) =>
    [...acc, t.hash, t.txid, t.txHash], []))

  getTimeInfo = (timestamp) => {
    if (timestamp) {
      return (
        <div>
          <Typography>
            {new Date(timestamp).toLocaleDateString()}
          </Typography>
          <Typography type="caption">
            {new Date(timestamp).toLocaleTimeString()}
          </Typography>
        </div>
      )
    }
    return <div>Unknown</div>
  }

  getEthereumTable = (transactions) => {
    const { classes } = this.props
    if (!isEmpty(transactions)) {
      return (
        <div>
          <div className={classes.tableSubHeader}>Ethereum:</div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell classes={{ root: classes.dateTd }}>Date</TableCell>
                <TableCell classes={{ root: classes.amountTd }}>Amount</TableCell>
                <TableCell compact classes={{ root: classes.hashTd }}>Transaction Hash</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {map(transactions, t => (
                <TableRow key={t.hash}>
                  <TableCell classes={{ root: classes.dateTd }}>
                    {this.getTimeInfo(t.timestamp)}
                  </TableCell>
                  <TableCell classes={{ root: classes.amountTd }}>
                    {t.value / weiToEth}
                  </TableCell>
                  <TableCell compact classes={{ root: classes.hashTd }}>
                    <a target="_blank" href={`https://etherscan.io/tx/${t.hash}`}>{t.hash}</a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    }
    return null
  }

  getBitcoinTable = (transactions) => {
    const { classes } = this.props
    if (!isEmpty(transactions)) {
      return (
        <div>
          <div className={classes.tableSubHeader}>Bitcoin:</div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell classes={{ root: classes.dateTd }}>Date</TableCell>
                <TableCell classes={{ root: classes.amountTd }}>Amount</TableCell>
                <TableCell compact classes={{ root: classes.hashTd }}>BTC Hash</TableCell>
                <TableCell compact classes={{ root: classes.confirmTd }}>Confirmations</TableCell>
                <TableCell compact classes={{ root: classes.hashTd }}>ETH Hash</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {map(transactions, t => (
                <TableRow key={t.txid}>
                  <TableCell classes={{ root: classes.dateTd }}>
                    {this.getTimeInfo(t.timestamp)}
                  </TableCell>
                  <TableCell classes={{ root: classes.amountTd }}>
                    {t.amount}
                  </TableCell>
                  <TableCell compact classes={{ root: classes.hashTd }}>
                    <a target="_blank" href={`https://blockchain.info/tx/${t.txid}`}>
                      {t.txid}
                    </a>
                  </TableCell>
                  <TableCell classes={{ root: classes.confirmTd }} compact>
                    {t.confirmations || 0}
                  </TableCell>
                  <TableCell compact classes={{ root: classes.hashTd }}>
                    <a target="_blank" href={`https://etherscan.io/tx/${t.txHash}`}>
                      {t.txHash}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    }
    return null
  }

  getContent = () => {
    const { transactions: { data }, classes } = this.props
    const transactions = this.sortTransactions(data)
    const ethereumTransactions = filter(transactions, x => x.isEthereum)
    const bitcoinTransactions = filter(transactions, x => x.isBitcoin)

    if (isEmpty(data)) {
      return (
        <Grid container spacing={0} align="center" justify="center">
          <p>You have no transactions right now</p>
        </Grid>
      )
    }

    return (
      <div className={classes.collapseContent}>
        {this.getEthereumTable(ethereumTransactions)}
        {this.getBitcoinTable(bitcoinTransactions)}
      </div>
    )
  }

  getTransactions = () => {
    const { dispatch } = this.props
    dispatch(fetchTransactionList())
    dispatch(fetchUserStatus())
    dispatch(fetchContractStatus())
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  handleUpdateSwitch = () => {
    const { dispatch, transactions: { isAutoUpdateEnabled } } = this.props
    dispatch(changeAutoUpdate(!isAutoUpdateEnabled))
  }

  sortTransactions = transactions => [
    ...orderBy(filter(transactions, x => x.timestamp), ['timestamp'], ['desc']),
    ...filter(transactions, x => !x.timestamp),
  ]

  render() {
    const { classes, transactions: { isAutoUpdateEnabled } } = this.props
    const { isFetching } = this.state

    return (
      <div className={classes.paper}>
        <Grid container spacing={0} justify="space-between" align="center">
          <Grid item sm={5} xs={12} className={classes.tableHeader}>Your Transactions</Grid>
          <Grid item xs container spacing={0} justify="flex-end" align="center">
            <div className={classes.autoUpdate}>Autoupdate</div>
            <Switch
              checked={isAutoUpdateEnabled}
              onChange={this.handleUpdateSwitch}
              aria-label="update"
            />
            <IconButton onClick={this.getTransactions}>
              <i
                className={classNames('fa', 'fa-refresh', classes.refreshIcon, isFetching ? 'fa-spin' : '')}
                aria-hidden
              />
            </IconButton>
            <IconButton
              className={classNames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Grid>
        </Grid>
        <LinearProgress style={{ opacity: isFetching ? 1 : 0 }} mode="query" />
        <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
          {this.getContent()}
        </Collapse>
      </div>
    )
  }
}
