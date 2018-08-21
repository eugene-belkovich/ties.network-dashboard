import { createStructuredSelector } from 'reselect'
import { bitcoinSelector, userStatusSelector } from '../../selectors'

export const bitcoinFlowSelector = createStructuredSelector({
  bitcoin: bitcoinSelector,
  userStatus: userStatusSelector,
})
