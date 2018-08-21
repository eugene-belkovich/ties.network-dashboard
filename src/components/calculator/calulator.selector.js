import { createStructuredSelector } from 'reselect'
import { contractSelector } from '../../selectors'

export const calulatorSelector = createStructuredSelector({
  contract: contractSelector,
})
