import { createStructuredSelector } from 'reselect'
import { userSelector } from './selectors'

export const ApplicationSelector = createStructuredSelector({
  user: userSelector,
})
