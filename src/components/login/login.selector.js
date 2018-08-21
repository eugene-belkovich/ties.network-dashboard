import { createStructuredSelector } from 'reselect'
import { userSelector } from '../../selectors'

export const loginSelector = createStructuredSelector({
  user: userSelector,
})
