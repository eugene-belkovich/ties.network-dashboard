import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'material-ui'
import injectSheet from 'react-jss'
import { classesPropTypes } from '../../prop-types'
import logo from '../../public/svg/logo.svg'

const styles = {
  logo: {
    width: '190px',
    marginBottom: '20px',
  },
}

@injectSheet(styles)
export class Logo extends React.Component {
  static propTypes = {
    classes: classesPropTypes,
    onClick: PropTypes.func,
  }

  render() {
    const { classes, onClick } = this.props
    return (
      <Grid onClick={onClick} className={classes.logo}>
        <img src={logo} alt="logo" />
      </Grid>
    )
  }
}
