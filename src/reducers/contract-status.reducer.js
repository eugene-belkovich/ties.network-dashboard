import {
  FETCH_CONTRACT_STATUS, FETCH_CONTRACT_STATUS_SUCCESS, FETCH_CONTRACT_STATUS_FAILED,
  UPDATE_CONTRACT_STATUS, UPDATE_CONTRACT_STATUS_SUCCESS, UPDATE_CONTRACT_STATUS_FAILED,
} from '../actions'

const defaultState = {
  isFetching: false,
  data: null,
}

export default function (state = defaultState, { type, payload }) {
  switch (type) {
    case UPDATE_CONTRACT_STATUS:
    case FETCH_CONTRACT_STATUS: {
      return {
        ...state,
        isFetching: true,
      }
    }

    case FETCH_CONTRACT_STATUS_SUCCESS: {
      return {
        ...state,
        data: payload,
        isFetching: false,
      }
    }

    case UPDATE_CONTRACT_STATUS_FAILED:
    case UPDATE_CONTRACT_STATUS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
      }
    }

    case FETCH_CONTRACT_STATUS_FAILED: {
      return {
        isFetching: false,
      }
    }

    default:
      return state
  }
}
