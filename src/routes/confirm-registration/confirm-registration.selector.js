import { createStructuredSelector } from 'reselect'
import { routerSelector, userSelector } from '../../selectors'

export const confirmRegistrationSelector = createStructuredSelector({
  router: routerSelector,
  user: userSelector,
})
