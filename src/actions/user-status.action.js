import { getUserStatus, loadCognitoUser } from '../utils'
import { setCognitoUser } from './'

export const US_USER_STATE_CHANGE = 'US_USER_STATE_CHANGE'
export const FETCH_USER_STATUS = 'FETCH_USER_STATUS'
export const FETCH_USER_STATUS_SUCCESS = 'FETCH_USER_STATUS_SUCCESS'
export const FETCH_USER_STATUS_FAILED = 'FETCH_USER_STATUS_FAILED'

export const fetchUserStatus = () => dispatch =>
  loadCognitoUser()
    .then((cognitoUser) => {
      dispatch(setCognitoUser(cognitoUser))
      dispatch({ type: FETCH_USER_STATUS })
      return getUserStatus(cognitoUser)
        .then((res) => {
          dispatch({ type: FETCH_USER_STATUS_SUCCESS, payload: res })
          return res
        })
        .catch((err) => {
          dispatch({ type: FETCH_USER_STATUS_FAILED })
          return Promise.reject(err)
        })
    })

export const changeUsAccessStatus = () => ({ type: US_USER_STATE_CHANGE })
