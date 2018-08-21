import { getConfig } from './aws.config'

const { baseUri } = getConfig()

export const getActualRate = () =>
  fetch('https://api.coinmarketcap.com/v1/ticker/', {
    method: 'GET',
    mode: 'cors',
  })
    .then(res => res.json())

export const getUserStatus = cognitoUser =>
  fetch(`${baseUri}/me`, {
    method: 'GET',
    headers: {
      Authorization: cognitoUser.signInUserSession.idToken.jwtToken,
      'Content-type': 'application/json',
    },
  })
    .then(res => res.json())

export const getUserReferrals = cognitoUser =>
  fetch(`${baseUri}/me/referrals`, {
    method: 'GET',
    headers: {
      Authorization: cognitoUser.signInUserSession.idToken.jwtToken,
      'Content-type': 'application/json',
    },
  })
    .then(res => res.json())

export const putEthereumWallet = (cognitoUser, wallet) =>
  fetch(`${baseUri}/me/ether`, {
    method: 'PUT',
    headers: {
      Authorization: cognitoUser.signInUserSession.idToken.jwtToken,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ wallet }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject()
    })

export const postAssignBtcWallet = cognitoUser =>
  fetch(`${baseUri}/me/btc`, {
    method: 'POST',
    headers: {
      Authorization: cognitoUser.signInUserSession.idToken.jwtToken,
      'Content-type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return res.json().then(json => Promise.reject(json))
    })


export const getContractStatus = () => fetch(`${baseUri}/contract/status`)
  .then(res => res.json())

export const getContractSettings = cognitoUser =>
  fetch(`${baseUri}/settings`, {
    method: 'GET',
    headers: {
      Authorization: cognitoUser.signInUserSession.idToken.jwtToken,
      'Content-type': 'application/json',
    },
  })
    .then(res => res.json())

export const putContractSettings = (cognitoUser, data) =>
  fetch(`${baseUri}/settings`, {
    method: 'PUT',
    headers: {
      Authorization: cognitoUser.signInUserSession.idToken.jwtToken,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return res.json().then(json => Promise.reject(json))
    })

export const getTransactionList = cognitoUser =>
    fetch(`${baseUri}/me/transactions`, {
      method: 'GET',
      headers: {
        Authorization: cognitoUser.signInUserSession.idToken.jwtToken,
        'Content-type': 'application/json',
      },
    }).then(res => res.json())
