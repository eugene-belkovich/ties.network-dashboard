import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import { PageWithNavbar } from '../../components'

const styles = {
  iframe: {
    height: '100vh',
    width: '100%',
    border: 'none',
  },
}

function FAQ({ classes }) {
  return (
    <PageWithNavbar>
      <iframe className={classes.iframe} title="faq" src="//kb.ties.network/faq.html" />
    </PageWithNavbar>
  )
}

FAQ.propTypes = {
  classes: PropTypes.shape({
    iframe: PropTypes.string,
  }).isRequired,
}

const FAQWithStyles = injectSheet(styles)(FAQ)

export { FAQWithStyles as FAQ }
