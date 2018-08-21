import { createStructuredSelector } from 'reselect'
import { routerSelector, userSelector } from '../../selectors'

export const pageWithNavbarSelector = createStructuredSelector({
  router: routerSelector,
  user: userSelector,
})
