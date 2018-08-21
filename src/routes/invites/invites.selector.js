import { createStructuredSelector } from 'reselect'
import { userSelector, referralsSelector } from '../../selectors'

export const invitesSelector = createStructuredSelector({
  user: userSelector,
  referrals: referralsSelector,
})
