import React from 'react'
import { Grid } from 'material-ui'
import { omit } from 'lodash/object'
import { childrenPropTypes } from '../../prop-types'

export function CenteredContainer(props) {
  const { children } = props
  const containerProps = omit(props, 'children')
  return (
    <Grid
      container
      direction="row"
      justify="center"
      align="center"
      spacing={0}
      {...containerProps}
    >
      {children}
    </Grid>
  )
}

CenteredContainer.propTypes = {
  children: childrenPropTypes,
}
