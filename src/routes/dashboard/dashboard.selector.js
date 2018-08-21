import { createStructuredSelector } from 'reselect'
import { userSelector, userStatusSelector, contractSelector, transactionsSelector } from '../../selectors'

export const dashboardSelector = createStructuredSelector({
  user: userSelector,
  userStatus: userStatusSelector,
  contract: contractSelector,
  transactions: transactionsSelector,
})
