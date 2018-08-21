import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode'
import { get, includes } from 'lodash'
import {
  SET_COGNITO_USER,
  POST_LOGIN,
  POST_SIGN_OUT,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  POST_SIGN_UP,
  SIGN_UP_FAILED,
  SIGN_UP_SUCCESS,
  SET_COGNITO_ATTRIBUTES,
  POST_RESEND_CODE,
  RESEND_CODE_FAILED,
  RESEND_CODE_SUCCESS,
  POST_CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
} from '../actions'
import { getSubdomains } from '../utils'

const cookies = new Cookies()

const defaultState = {
  isFetching: false,
  cognitoUser: null,
  isLoggedIn: false,
  attributes: null,
  resendCode: {},
  from: cookies.get('from'),
}

export default function (state = defaultState, { type, payload }) {
  switch (type) {
    case SET_COGNITO_USER: {
      const jwtData = jwtDecode(payload.signInUserSession.idToken.jwtToken)
      const userId = get(jwtData, 'sub', '')

      if (userId) {
        cookies.set('userId', userId, {
          domain: getSubdomains(),
          path: '/',
          expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)),
        })
      }

      return {
        ...state,
        cognitoUser: payload,
        isAdmin: includes(get(jwtData, 'cognito:groups'), 'Admin'),
        isLoggedIn: true,
      }
    }
    case SET_COGNITO_ATTRIBUTES: {
      return {
        ...state,
        isLoggedIn: true,
        attributes: payload,
      }
    }
    case POST_LOGIN: {
      return {
        ...state,
        isFetching: true,
      }
    }

    case POST_SIGN_OUT: {
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
        attributes: null,
      }
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        isFetching: false,
      }
    }

    case LOGIN_FAILED: {
      return {
        ...state,
        isFetching: false,
      }
    }

    case POST_SIGN_UP: {
      return {
        ...state,
        isFetching: true,
      }
    }

    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        isFetching: false,
      }
    }

    case SIGN_UP_FAILED: {
      return {
        ...state,
        isFetching: false,
      }
    }

    case POST_RESEND_CODE: {
      return {
        ...state,
        resendCode: { isFetching: true },
      }
    }

    case RESEND_CODE_FAILED: {
      return {
        ...state,
        resendCode: { isFetching: false, error: payload },
      }
    }

    case RESEND_CODE_SUCCESS: {
      return {
        ...state,
        resendCode: { isFetching: false, success: true },
      }
    }

    case POST_CHANGE_PASSWORD: {
      return {
        ...state,
        isFetching: true,
      }
    }

    case CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
      }
    }

    case CHANGE_PASSWORD_FAILED: {
      return {
        ...state,
        isFetching: false,
      }
    }

    default:
      return state
  }
}
