import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { DateBetween } from './date-between'
import { List } from '../'
import { classesPropTypes } from '../../prop-types'
import './countdown.css'

const styles = {
  wrapper: {
    margin: '10px 0',
  },
}

@injectSheet(styles)
export class CountdownList extends React.Component {

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
        if (this.props.cb) {
          this.props.cb()
        }
      }

      this.setState({
        remaining: remaining || 'time expired',
      })
    }
  }

  render() {
    const { classes, currentBonus } = this.props
    return (
      <List
        className={classes.wrapper}
        textClasses={{ root: 'countdown-list' }}
        data={[
          { primary: 'Token distribution ends in', secondary: this.state.remaining },
          { primary: 'Current bonus', secondary: `+${currentBonus}%` },
        ]}
      />
    )
  }
}

CountdownList.propTypes = {
  endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentBonus: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  cb: PropTypes.func,
  classes: classesPropTypes,
}
