import { createStructuredSelector } from 'reselect'
import { userSelector } from '../../selectors'

export const changePasswordSelector = createStructuredSelector({
  user: userSelector,
})
