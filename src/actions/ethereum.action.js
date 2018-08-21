import { FETCH_USER_STATUS_SUCCESS, FETCH_USER_STATUS, FETCH_USER_STATUS_FAILED, setCognitoUser } from './'
import { putEthereumWallet, loadCognitoUser, dataLayerPush } from '../utils'

export const setEthereumWallet = wallet => dispatch =>
  loadCognitoUser()
    .then((cognitoUser) => {
      dispatch(setCognitoUser(cognitoUser))
      dispatch({ type: FETCH_USER_STATUS })
      return putEthereumWallet(cognitoUser, wallet)
        .then((res) => {
          dataLayerPush({
            event: 'GAevent',
            eventCategory: 'payment',
            eventAction: 'ETH',
            eventLabel: wallet,
          })
          dispatch({ type: FETCH_USER_STATUS_SUCCESS, payload: res })
        })
        .catch(() => dispatch({ type: FETCH_USER_STATUS_FAILED }))
    })
