import { createStructuredSelector } from 'reselect'
import { userSelector } from '../../selectors'

export const forgotPasswordSelector = createStructuredSelector({
  user: userSelector,
})
