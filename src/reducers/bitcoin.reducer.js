import {
  GENERATE_BTC_ADDRESS,
  GENERATE_BTC_ADDRESS_SUCCESS,
  GENERATE_BTC_ADDRESS_FAILED,
  EXPIRE_BTC_ADDRESS,
} from '../actions'

const defaultState = {
  isFetching: false,
  isExpired: false,
  data: null,
  error: null,
}

export default function (state = defaultState, { type, payload }) {
  switch (type) {
    case GENERATE_BTC_ADDRESS: {
      return {
        ...state,
        error: null,
        isFetching: true,
      }
    }

    case GENERATE_BTC_ADDRESS_SUCCESS: {
      return {
        ...state,
        data: payload,
        isFetching: false,
        isExpired: false,
      }
    }

    case GENERATE_BTC_ADDRESS_FAILED: {
      return {
        ...state,
        error: payload,
        isFetching: false,
        isExpired: false,
      }
    }

    case EXPIRE_BTC_ADDRESS: {
      return {
        ...state,
        isExpired: true,
      }
    }

    default:
      return state
  }
}
