import { createStructuredSelector } from 'reselect'
import { ethereumSelector } from '../../selectors'

export const ethSelector = createStructuredSelector({
  ethRate: ethereumSelector,
})
