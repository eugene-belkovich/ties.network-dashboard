import React, { Component } from 'react'
import { Grid } from 'material-ui'
import injectSheet from 'react-jss'
import { PageWithNavbar, Logo } from '../../components'
import { classesPropTypes } from '../../prop-types'

const styles = {
  wrapper: {
    padding: '40px',
    minHeight: 'calc(100vh - 64px)',
    width: '100%',
  },
  centeredText: {
    textAlign: 'center',
  },
}

@injectSheet(styles)
export class NotFound extends Component {
  static propTypes = {
    classes: classesPropTypes,
  }

  render() {
    const { classes } = this.props
    return (
      <PageWithNavbar>
        <Grid
          container
          direction="column"
          align="center"
          justify="center"
          className={classes.wrapper}
          spacing={0}
        >
          <Logo />
          <h3 className={classes.centeredText}>404 page not found</h3>
          <p className={classes.centeredText}>
            We are sorry but the page you are looking for does not exist.
          </p>
        </Grid>
      </PageWithNavbar>
    )
  }
}

