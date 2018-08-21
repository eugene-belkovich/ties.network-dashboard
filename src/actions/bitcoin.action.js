import { setCognitoUser } from './'
import { postAssignBtcWallet, loadCognitoUser, getUserStatus } from '../utils'

export const GENERATE_BTC_ADDRESS = 'GENERATE_BTC_ADDRESS'
export const GENERATE_BTC_ADDRESS_SUCCESS = 'GENERATE_BTC_ADDRESS_SUCCESS'
export const GENERATE_BTC_ADDRESS_FAILED = 'GENERATE_BTC_ADDRESS_FAILED'
export const EXPIRE_BTC_ADDRESS = 'EXPIRE_BTC_ADDRESS'

export const generateBitcoinWallet = () => (dispatch) => {
  loadCognitoUser()
    .then((cognitoUser) => {
      dispatch(setCognitoUser(cognitoUser))
      dispatch({ type: GENERATE_BTC_ADDRESS })
      return postAssignBtcWallet(cognitoUser)
        .then((bitcoinAddress) => {
          console.log(bitcoinAddress)
          return getUserStatus(cognitoUser)
            .then((res) => {
              dispatch({ type: GENERATE_BTC_ADDRESS_SUCCESS, payload: res })
              return res
            })
        })
        .catch(err => dispatch({ type: GENERATE_BTC_ADDRESS_FAILED, payload: err }))
    })
}

export const expireBtcAddress = { type: EXPIRE_BTC_ADDRESS }
