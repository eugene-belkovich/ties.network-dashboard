import { createStructuredSelector } from 'reselect'
import { userSelector } from '../../selectors'

export const signUpSelector = createStructuredSelector({
  user: userSelector,
})
