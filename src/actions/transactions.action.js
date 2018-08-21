import { getTransactionList, loadCognitoUser } from '../utils'
import { setCognitoUser } from './'

export const FETCH_TRANSACTION_LIST = 'FETCH_TRANSACTION_LIST'
export const FETCH_TRANSACTION_LIST_SUCCESS = 'FETCH_TRANSACTION_LIST_SUCCESS'
export const FETCH_TRANSACTION_LIST_FAILED = 'FETCH_TRANSACTION_LIST_FAILED'
export const CHANGE_AUTO_UPDATE = 'CHANGE_AUTO_UPDATE'

export const fetchTransactionList = () => dispatch =>
  loadCognitoUser()
    .then((cognitoUser) => {
      dispatch(setCognitoUser(cognitoUser))
      dispatch({ type: FETCH_TRANSACTION_LIST })
      return getTransactionList(cognitoUser)
        .then((res) => {
          dispatch({ type: FETCH_TRANSACTION_LIST_SUCCESS, payload: res })
          return res
        })
        .catch((err) => {
          dispatch({ type: FETCH_TRANSACTION_LIST_FAILED })
          return Promise.reject(err)
        })
    })


export const changeAutoUpdate = payload => (dispatch) => {
  dispatch({ type: CHANGE_AUTO_UPDATE, payload })
}
