/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import injectSheet from 'react-jss'
import { classesPropTypes, childrenPropTypes } from '../../prop-types'

const styles = {
  wrapper: {
    borderLeft: '4px solid',
    borderColor: props => props.color || '#174DA1',
    paddingLeft: 20,
    margin: '10px 0',
  },
  title: {
    fontFamily: 'AvenirNextLTPro-Bold',
    fontSize: 16,
    marginBottom: 5,
    marginTop: -3,
  },
}

const component = ({ classes, title, children, className }) => (
  <div className={classNames(classes.wrapper, className)}>
    <div className={classes.title}>{title}</div>
    <div>
      {children}
    </div>
  </div>
)

component.propTypes = {
  classes: classesPropTypes,
  className: PropTypes.string,
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: childrenPropTypes,
}

export const Callout = injectSheet(styles)(component)
