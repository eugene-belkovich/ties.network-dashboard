/* eslint-disable react/prop-types */
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, CircularProgress } from 'material-ui'
import { get, find } from 'lodash'
import { renderTextField } from './../form'
import { fetchContractStatus } from './../../actions'
import { getActualRate } from './../../utils'

const validate = (values) => {
  const errors = {}
  const requiredFields = ['endTimestamp', 'ethRate', 'btcRate']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  if (!/^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(values.ethRate)) {
    errors.ethRate = 'Please ensure that you enter positive float value'
  }

  if (!/^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(values.btcRate)) {
    errors.btcRate = 'Please ensure that you enter positive float value'
  }

  if (!/^[-+]?\d+$/.test(values.endTimestamp)) {
    errors.endTimestamp = 'Please ensure that you enter positive integer value'
  }

  return errors
}


@compose(reduxForm({ form: 'AdminSettingsForm', validate }),
  connect(state => ({ initialValues: state.contract.data })))
export class AdminSettingsForm extends React.Component {

  state = {
    isDirty: false,
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchContractStatus())
      .then(this.handleInitialize)
  }

  getServerError() {
    const { serverError } = this.props
    if (serverError) {
      return (
        <Grid item className="server-error-wrapper">
          <span className="server-error-message">
            {serverError}
          </span>
        </Grid>
      )
    }
    return <Grid item className="errorPlaceholder" />
  }

  getButtons() {
    const { pristine, submitting, valid, contract } = this.props
    const { isDirty } = this.state
    if (!get(contract, 'isFetching')) {
      return (
        <Grid container direction="column" align="center">
          <Button raised onClick={() => this.fetchActualRate()}>
            Get Actual Rates
          </Button>
          <br />
          <Button raised color="primary" type="submit" disabled={(pristine && !isDirty) || submitting || !valid}>
            Save Settings
          </Button>
        </Grid>
      )
    }
    return <CircularProgress />
  }

  handleInitialize = (contractData, res) => {
    const { endTimestamp, ethRate, btcRate } = contractData

    const initData = {
      endTimestamp,
      ethRate: get(find(res, { id: 'ethereum' }), 'price_usd', ethRate),
      btcRate: get(find(res, { id: 'bitcoin' }), 'price_usd', btcRate),
    }

    if (res) {
      this.setState({ isDirty: true })
    }

    this.props.initialize(initData)
  }

  fetchActualRate() {
    const { initialValues } = this.props
    getActualRate()
      .then(res => this.handleInitialize(initialValues, res))
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Grid item>
          <Field
            component={renderTextField}
            label="End Timestamp"
            type="text"
            name="endTimestamp"
          />
        </Grid>

        <Grid item className="eth-rate-container">
          <Field
            component={renderTextField}
            label="Ethereum Rate"
            type="text"
            name="ethRate"
          />
        </Grid>

        <Grid item>
          <Field
            component={renderTextField}
            label="Bitcoin Rate"
            type="text"
            name="btcRate"
          />
        </Grid>

        {this.getServerError()}
        <Grid container justify="center" spacing={0}>
          {this.getButtons()}
        </Grid>
      </form>
    )
  }
}
