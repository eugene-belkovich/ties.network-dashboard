import { push } from 'react-router-redux'
import Cookies from 'universal-cookie'
import {
  postLogin,
  postSignUp,
  postSignUpConfirmation,
  getCognitoAttributes,
  postSignOut,
  postForgotPassword,
  postConfirmPassword,
  postResendCode,
  postChangePassword,
  loadCognitoUser,
  dataLayerPush,
} from '../utils'

export const SET_COGNITO_USER = 'SET_COGNITO_USER'
export const SET_COGNITO_ATTRIBUTES = 'SET_COGNITO_ATTRIBUTES'
export const POST_LOGIN = 'POST_LOGIN'
export const POST_SIGN_OUT = 'POST_SIGN_OUT'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const POST_SIGN_UP = 'POST_SIGN_UP'
export const SIGN_UP_FAILED = 'SIGN_UP_FAILED'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const POST_RESEND_CODE = 'POST_RESEND_CODE'
export const RESEND_CODE_FAILED = 'RESEND_CODE_FAILED'
export const RESEND_CODE_SUCCESS = 'RESEND_CODE_SUCCESS'
export const POST_CHANGE_PASSWORD = 'POST_CHANGE_PASSWORD'
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_FAILED = 'CHANGE_PASSWORD_FAILED'

const cookies = new Cookies()

export const setCognitoUser = payload => (dispatch) => {
  dispatch({ type: SET_COGNITO_USER, payload })
  return getCognitoAttributes(payload)
    .then(attributes => dispatch({ type: SET_COGNITO_ATTRIBUTES, payload: attributes }))
}

export const confirmRegistration = (email, code) => () => postSignUpConfirmation(email, code)

export const registerUser = ({ email, password }) => (dispatch) => {
  dispatch({ type: POST_SIGN_UP })
  const from = cookies.get('from')
  return postSignUp(email, password, from)
    .then((res) => {
      dispatch({ type: SIGN_UP_SUCCESS })
      dataLayerPush({
        event: 'GAevent',
        eventCategory: 'user',
        eventAction: 'register',
      })
      return res
    })
    .catch((err) => {
      dispatch({ type: SIGN_UP_FAILED })
      return Promise.reject(err)
    })
}

export const loginUser = ({ email, password }) => (dispatch) => {
  dispatch({ type: POST_LOGIN })
  return postLogin(email, password)
    .then(payload =>
      dispatch(setCognitoUser(payload))
        .then(() => {
          dispatch({ type: LOGIN_SUCCESS })
          dataLayerPush({
            event: 'GAevent',
            eventCategory: 'user',
            eventAction: 'login',
          })
          return dispatch(push('/'))
        }))
    .catch((err) => {
      dispatch({ type: LOGIN_FAILED })
      return Promise.reject(err)
    })
}

export const signOut = () => dispatch =>
  loadCognitoUser()
    .then((cognitoUser) => {
      postSignOut(cognitoUser)
      dispatch({ type: POST_SIGN_OUT })
      return dispatch(push('/'))
    })
    .catch((err) => {
      console.log(err)
      dispatch({ type: POST_SIGN_OUT })
      return dispatch(push('/'))
    })

export const resendCode = email => (dispatch) => {
  dispatch({ type: POST_RESEND_CODE })
  return postResendCode(email)
    .then(() => dispatch({ type: RESEND_CODE_SUCCESS }))
    .catch(payload => dispatch({ type: RESEND_CODE_FAILED, payload }))
}
export const forgotPassword = ({ email }) => () => postForgotPassword(email)
export const confirmPassword = ({ email, verificationCode, password }) =>
  () => postConfirmPassword(email, verificationCode, password)

export const changePassword = ({ oldPassword, password }) => dispatch =>
  loadCognitoUser()
    .then((cognitoUser) => {
      dispatch(setCognitoUser(cognitoUser))
      dispatch({ type: POST_CHANGE_PASSWORD })
      return postChangePassword(cognitoUser, oldPassword, password)
        .then((payload) => {
          dispatch({ type: CHANGE_PASSWORD_SUCCESS })
          return payload
        })
        .catch((err) => {
          dispatch({ type: CHANGE_PASSWORD_FAILED })
          return Promise.reject(err)
        })
    })
