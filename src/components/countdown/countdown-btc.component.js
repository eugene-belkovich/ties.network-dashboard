import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { DateBetween } from './date-between'
import { classesPropTypes } from '../../prop-types'
import './countdown.css'

const styles = {
  btcExpireTime: {
    color: '#174DA1',
    fontSize: '12px',
  },
}

@connect()
@injectSheet(styles)
export class BtcCountdown extends React.Component {

  constructor(props) {
    super(props)
    this.state = { remaining: null }
  }

  componentDidMount() {
    this.tick()
    this.interval = setInterval(this.tick.bind(this), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick() {
    if (this.props.endDate) {
      const startDate = new Date()
      const endDate = new Date(this.props.endDate)
      const remaining = DateBetween(startDate, endDate)

      if (remaining === false) {
        clearInterval(this.interval)
        if (this.props.onExpire) {
          this.props.onExpire()
        }
      }

      this.setState({
        remaining: remaining || 'time expired',
      })
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.btcExpireTime}>
        Your bitcoin wallet will expire in {this.state.remaining},
        if you don&apos;t start any transaction
      </div>
    )
  }
}

BtcCountdown.propTypes = {
  endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onExpire: PropTypes.func,
  classes: classesPropTypes,
}
