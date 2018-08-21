import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Grid, Button } from 'material-ui'
import { connect } from 'react-redux'
import { Callout } from '../'
import { signOut, changeUsAccessStatus } from '../../actions'

const styles = () => ({
  wrapper: {
    margin: '10px 0',
    padding: '15px',
    backgroundColor: 'white',
  },
  button: {
    margin: '20px 0 0 20px',
  },
  calloutText: {
    fontFamily: 'AvenirNextLTPro',
    fontSize: 16,
    lineHeight: '24px',
  },
})

@connect()
@withStyles(styles)
export class CountryWarning extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  onLogout = () => {
    this.props.dispatch(signOut())
  }

  onContinue = () => {
    localStorage.setItem('us-access', true)
    this.props.dispatch(changeUsAccessStatus())
  }

  render() {
    const { classes } = this.props

    return (
      <Grid item className={classes.wrapper}>
        <Grid item>
          <Callout title="WE ARE SORRY OUR  TGE IS NOT AVAILABLE FOR YOUR COUNTRY!" color="#E5332D">
            <div className={classes.calloutText}>
              In case you invest via the website using the US IP, your actions are considered
              to be illegal and are prohibited by the legislation of your country. These rules
              are relevant to all but certified (accredited) investors.
            </div>
          </Callout>
          <Grid container spacing={0} align="center">
            <Grid item xs container spacing={0} align="center" justify="flex-end">
              <Button
                raised
                color="primary"
                className={classes.button}
                onClick={() => this.onLogout()}
              >
                Sign out
              </Button>
              <Button
                raised
                color="primary"
                className={classes.button}
                onClick={() => this.onContinue()}
              >
                It is a mistake, let me in
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
