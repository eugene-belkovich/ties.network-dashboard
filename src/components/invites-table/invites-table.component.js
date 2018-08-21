import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles, Grid, CircularProgress, IconButton } from 'material-ui'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import Collapse from 'material-ui/transitions/Collapse'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import { connect } from 'react-redux'
import { isEmpty, map } from 'lodash'
import { invitesTableSelector } from './invites-table.selector'
import { referralsPropTypes } from '../../prop-types'
import { fetchReferrals } from '../../actions'
import { formatBalance } from '../../utils'

const styles = theme => ({
  paper: {
    width: '100%',
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
  collapseContent: {
    overflow: 'auto',
  },
  text: {
    fontFamily: 'AvenirNextLTPro',
    fontSize: 16,
  },
  total: {
    fontFamily: 'AvenirNextLTPro-Demi',
    fontSize: 16,
    padding: '20px',
  },
  noReferrals: {
    fontFamily: 'AvenirNextLTPro',
    fontSize: 16,
    padding: '10px 20px 30px 20px',
    textAlign: 'center',
  },
  loading: {
    padding: '10px 20px 30px 20px',
  },
})

@withStyles(styles)
@connect(invitesTableSelector)
export class InvitesTable extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    referrals: referralsPropTypes,
    dispatch: PropTypes.func.isRequired,
  }

  state = {
    expanded: true,
  }

  componentDidMount() {
    this.props.dispatch(fetchReferrals())
  }

  getInvitesTable = () => {
    const { classes, referrals: { data, isFetching, totalBonus } } = this.props

    if (isFetching) {
      return (
        <Grid className={classes.loading} container spacing={0} align="center" justify="center">
          <CircularProgress />
        </Grid>
      )
    }

    if (!isEmpty(data)) {
      return (
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell numeric>TIE Amount</TableCell>
                <TableCell numeric>Bonus</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {map(data, (r, i) => (
                <TableRow key={r.cognitoId || i}>
                  <TableCell>
                    {r.cognitoId}
                  </TableCell>
                  <TableCell numeric>
                    {formatBalance(r.balance)}
                  </TableCell>
                  <TableCell numeric>
                    {formatBalance(r.balance * 0.02)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className={classes.total} key="total">
                <TableCell>Total Bonus:</TableCell>
                <TableCell />
                <TableCell numeric>{formatBalance(totalBonus)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )
    }
    return (
      <Grid container spacing={0} align="center" justify="center">
        <p className={classes.noReferrals}>You have no any referrals right now</p>
      </Grid>
    )
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.paper}>
        <Grid container spacing={0} justify="space-between" align="center">
          <Grid item xs className={classes.tableHeader}>Your Referrals</Grid>
          <Grid item xs container spacing={0} justify="flex-end" align="center">
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
        <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
          <div className={classes.collapseContent}>
            {this.getInvitesTable()}
          </div>
        </Collapse>
      </div>
    )
  }
}
