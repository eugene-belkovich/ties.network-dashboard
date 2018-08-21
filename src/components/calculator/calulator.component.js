import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Grid, TextField, Button, Select, Input, MenuItem } from 'material-ui'
import { connect } from 'react-redux'
import { calulatorSelector } from './calulator.selector'
import { Callout } from '../'
import { weiToEth } from '../../utils'

const styles = () => ({
  wrapper: {
    margin: '10px 0',
    padding: '15px',
    backgroundColor: 'white',
  },
  titleText: {
    paddingLeft: 5,
    fontSize: 16,
  },
  calculatorResult: {
    color: '#000000',
    fontSize: 16,
  },
  calculateButton: {
    margin: '20px 0 20px 20px',
  },
  input: {
    margin: '20px 0 35px 0',
  },
  calloutText: {
    fontFamily: 'AvenirNextLTPro',
    fontSize: 16,
    lineHeight: '24px',
  },
  controls: {
    maxWidth: 270,
  },
})

@withStyles(styles)
@connect(calulatorSelector)
export class Calculator extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    contract: PropTypes.object,
  }

  state = {
    amount: '',
    result: '',
    currency: 'ETH',
  }

  onCalculateChange = (event) => {
    if (!event.target.value) {
      this.setState({ amount: '' })
      return
    }
    this.setState({ amount: event.target.value })
  }

  onCalculateClick = () => {
    if (this.props.contract.data) {
      const { currentBonus, tokenPrice, btcRate, ethRate } = this.props.contract.data
      const { currency, amount } = this.state
      const ethAmount = currency === 'ETH' ? amount : amount * (btcRate / ethRate)
      const result = (ethAmount * (weiToEth / tokenPrice) * ((currentBonus + 100) / 100))
      this.setState({ result })
    }
  }

  handleCurrencyChange = e => this.setState({ currency: e.target.value })

  render() {
    const { classes } = this.props

    return (
      <Grid item className={classes.wrapper}>
        <Grid item>
          <span className={classes.titleText}>
            Calculate how many TIE you can get
          </span>
          <Callout title="IMPORTANT!" color="#174DA1">
            <div className={classes.calloutText}>
              The number of tokens is preliminary and based on the current
              bonus at the current moment. It may change by the time of your
              transaction reach our smart contract. So you are encouraged
              to make it as soon as possible.
            </div>
            <div className={classes.calloutText}>
              If you don&apos;t have the private key of this ETH address, you will not have access
              to your TIE tokens!
            </div>
          </Callout>
          <Grid container spacing={0} align="center">
            <TextField
              onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9$.]/g, '') }}
              label="Enter the amount"
              onChange={this.onCalculateChange}
              className={classes.input}
              value={this.state.amount}
              margin="normal"
            />

            <Grid className={classes.controls} item xs container spacing={0} align="center" justify="flex-end">
              <Select
                value={this.state.currency}
                onChange={this.handleCurrencyChange}
                input={<Input id="age-helper" />}
              >
                <MenuItem value="ETH">Ethereum</MenuItem>
                <MenuItem value="BTC">Bitcoin</MenuItem>
              </Select>

              <Button
                raised
                color="primary"
                className={classes.calculateButton}
                onClick={() => this.onCalculateClick()}
              >
                Calculate
              </Button>
            </Grid>
          </Grid>
          {this.state.result &&
          <div className={classes.calculatorResult}>
            TIE amount: {this.state.result.toLocaleString()}
          </div>
          }
        </Grid>
      </Grid>
    )
  }
}
