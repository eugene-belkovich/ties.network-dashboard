import { createStructuredSelector } from 'reselect'
import { transactionsSelector } from '../../selectors'

export const transactionsInfoSelector = createStructuredSelector({
  transactions: transactionsSelector,
})
