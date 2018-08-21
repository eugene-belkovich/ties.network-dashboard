import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { range, map, reduce } from 'lodash'
import { List as MaterialList, ListItemText, Divider, ListItem } from 'material-ui'
import injectSheet from 'react-jss'
import { classesPropTypes } from '../../prop-types'

const styles = {
  wrapper: {
    background: 'white',
  },
}

const getListItems = (data, textClasses) => {
  const listData = map(data, ({ primary, secondary }) => (
    <ListItem key={primary}>
      <ListItemText classes={textClasses} primary={primary} secondary={secondary} />
    </ListItem>
  ))
  const dividers = map(range(listData.length - 1), i => <Divider key={i} light />)
  return reduce(listData, (a, b, i) => {
    a.push(b)
    if (dividers[i]) {
      a.push(dividers[i])
    }
    return a
  }, [])
}

const component = ({ classes, data, className, textClasses }) => (
  <MaterialList className={classNames(classes.wrapper, className)}>
    {getListItems(data, textClasses)}
  </MaterialList>
)

component.propTypes = {
  classes: classesPropTypes,
  data: PropTypes.arrayOf(PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string,
  })).isRequired,
  className: PropTypes.string,
  textClasses: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

export const List = injectSheet(styles)(component)
