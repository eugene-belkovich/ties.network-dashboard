import { Config, CognitoIdentityCredentials } from 'aws-sdk'
import { toLower } from 'lodash'
import { CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'
import { getConfig } from './aws.config'

const awsConfig = getConfig()
const REGION = 'eu-central-1'
const IDENTITY_POOL_ID = awsConfig.IdentityPoolId

Config.region = REGION
const poolData = { UserPoolId: awsConfig.UserPoolId, ClientId: awsConfig.ClientId }
const userPool = new CognitoUserPool(poolData)

export const postSignUp = (email, password, from) => new Promise((resolve, reject) => {
  const attributeList = []
  const dataEmail = { Name: 'email', Value: toLower(email) }
  const dataFrom = { Name: 'custom:from', Value: from }
  const attributeEmail = new CognitoUserAttribute(dataEmail)
  const attributeFrom = new CognitoUserAttribute(dataFrom)

  attributeList.push(attributeEmail, attributeFrom)

  userPool.signUp(toLower(email), password, attributeList, null, (err, result) => {
    if (err) {
      return reject(err)
    }
    const cognitoUser = result.user
    return resolve(cognitoUser)
  })
})

export const postSignUpConfirmation = (email, code) => new Promise((resolve, reject) => {
  const userData = { Username: toLower(email), Pool: userPool }
  const cognitoUser = new CognitoUser(userData)

  cognitoUser.confirmRegistration(code, true, (err, result) => {
    if (err) {
      return reject(err)
    }
    return resolve(result)
  })
})

export const postLogin = (email, password) => new Promise((resolve, reject) => {
  const authenticationData = { Username: toLower(email), Password: password }
  const authenticationDetails = new AuthenticationDetails(authenticationData)
  const userData = { Username: toLower(email), Pool: userPool }

  const cognitoUser = new CognitoUser(userData)
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      Config.credentials = new CognitoIdentityCredentials({
        IdentityPoolId: IDENTITY_POOL_ID, // your identity pool id here
        Logins: {
          // Change the key below according to the specific region your user pool is in.
          [`${IDENTITY_POOL_ID}.${REGION}.amazonaws.com/${poolData.UserPoolId}`]: result.getIdToken().getJwtToken(),
        },
      })

      return resolve(cognitoUser)
    },

    onFailure: err => reject(err),
  })
})

export const loadCognitoUser = () => new Promise((resolve, reject) => {
  const cognitoUser = userPool.getCurrentUser()

  if (cognitoUser) {
    cognitoUser.getSession((err, session) => {
      if (err) {
        return reject(err)
      }

      Config.credentials = new CognitoIdentityCredentials({
        IdentityPoolId: IDENTITY_POOL_ID, // your identity pool id here
        Logins: {
          // Change the key below according to the specific region your user pool is in.
          [`${IDENTITY_POOL_ID}.${REGION}.amazonaws.com/${poolData.UserPoolId}`]: session.getIdToken().getJwtToken(),
        },
      })
      return resolve(cognitoUser)
    })
  }
  return reject()
})

export const getCognitoAttributes = cognitoUser => new Promise((resolve, reject) =>
  // eslint-disable-next-line no-confusing-arrow
  cognitoUser.getUserAttributes((err, result) => err ? reject(err) : resolve(result)))

export const postSignOut = (cognitoUser) => {
  const user = cognitoUser || userPool.getCurrentUser()
  return user.signOut()
}

export const postForgotPassword = username => new Promise((resolve, reject) => {
  const cognitoUser = new CognitoUser({ Username: toLower(username), Pool: userPool })
  cognitoUser.forgotPassword({
    onSuccess: () => resolve({ username: toLower(username) }),
    onFailure: err => reject(err),
  })
})

export const postConfirmPassword = (username, verificationCode, newPassword) =>
  new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({ Username: username, Pool: userPool })
    return cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: () => resolve(),
      onFailure: err => reject(err),
    })
  })

export const postResendCode = username => new Promise((resolve, reject) => {
  const cognitoUser = new CognitoUser({ Username: toLower(username), Pool: userPool })
  return cognitoUser.resendConfirmationCode((err) => {
    if (err) {
      reject(err)
    }
    resolve()
  })
})

export const postChangePassword = (user, oldPassword, newPassword) =>
  new Promise((resolve, reject) => {
    const cognitoUser = user || userPool.getCurrentUser()

    cognitoUser.changePassword(oldPassword, newPassword, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
