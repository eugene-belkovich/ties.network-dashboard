import { createStructuredSelector } from 'reselect'
import { referralsSelector } from '../../selectors'

export const invitesTableSelector = createStructuredSelector({
  referrals: referralsSelector,
})
