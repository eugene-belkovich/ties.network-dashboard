import {
  FETCH_TRANSACTION_LIST,
  FETCH_TRANSACTION_LIST_SUCCESS,
  FETCH_TRANSACTION_LIST_FAILED,
  CHANGE_AUTO_UPDATE,
} from '../actions'

const defaultState = {
  isFetching: false,
  isAutoUpdateEnabled: false,
  data: null,
}

export default function (state = defaultState, { type, payload }) {
  switch (type) {
    case FETCH_TRANSACTION_LIST: {
      return {
        ...state,
        isFetching: true,
      }
    }

    case FETCH_TRANSACTION_LIST_SUCCESS: {
      return {
        ...state,
        data: payload,
        isFetching: false,
      }
    }

    case FETCH_TRANSACTION_LIST_FAILED: {
      return {
        ...state,
        isFetching: false,
      }
    }

    case CHANGE_AUTO_UPDATE: {
      return {
        ...state,
        isAutoUpdateEnabled: payload,
      }
    }

    default:
      return state
  }
}
