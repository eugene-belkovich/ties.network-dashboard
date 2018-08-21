import { createStructuredSelector } from 'reselect'
import { userSelector, contractSelector } from '../../selectors'

export const adminSettingSelector = createStructuredSelector({
  user: userSelector,
  contract: contractSelector,
})
