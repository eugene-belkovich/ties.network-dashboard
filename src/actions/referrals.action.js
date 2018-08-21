import { loadCognitoUser, getUserReferrals } from '../utils'

export const FETCH_REFERRALS = 'FETCH_REFERRALS'
export const FETCH_REFERRALS_SUCCESS = 'FETCH_REFERRALS_SUCCESS'
export const FETCH_REFERRALS_FAILED = 'FETCH_REFERRALS_FAILED'

export const fetchReferrals = () => dispatch =>
  loadCognitoUser()
    .then((cognitoUser) => {
      dispatch({ type: FETCH_REFERRALS })
      return getUserReferrals(cognitoUser)
        .then((res) => {
          dispatch({ type: FETCH_REFERRALS_SUCCESS, payload: res })
          return res
        })
        .catch((err) => {
          dispatch({ type: FETCH_REFERRALS_FAILED })
          return Promise.reject(err)
        })
    })
