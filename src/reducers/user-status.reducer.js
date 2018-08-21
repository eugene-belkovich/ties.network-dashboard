import Cookies from 'universal-cookie'
import { get } from 'lodash'
import {
  FETCH_USER_STATUS,
  FETCH_USER_STATUS_SUCCESS,
  FETCH_USER_STATUS_FAILED,
  GENERATE_BTC_ADDRESS_SUCCESS,
  US_USER_STATE_CHANGE,
} from '../actions'
import { getSubdomains } from '../utils'

const cookies = new Cookies()

const defaultState = {
  isFetching: false,
  data: null,
  usAccess: localStorage.getItem('us-access'),
}

export default function (state = defaultState, { type, payload }) {
  switch (type) {
    case FETCH_USER_STATUS: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case GENERATE_BTC_ADDRESS_SUCCESS:
    case FETCH_USER_STATUS_SUCCESS: {
      const ethAddress = get(payload, 'etherWallet', '')

      if (ethAddress) {
        cookies.set('ethAddress', ethAddress, {
          domain: getSubdomains(),
          path: '/',
          expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)),
        })
      }

      return {
        ...state,
        data: payload,
        isFetching: false,
      }
    }

    case FETCH_USER_STATUS_FAILED: {
      return {
        isFetching: false,
      }
    }

    case US_USER_STATE_CHANGE: {
      return {
        ...state,
        usAccess: localStorage.getItem('us-access'),
      }
    }

    default:
      return state
  }
}
