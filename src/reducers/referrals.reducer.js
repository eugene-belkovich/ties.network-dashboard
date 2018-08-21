import { reduce } from 'lodash'
import {
  FETCH_REFERRALS,
  FETCH_REFERRALS_SUCCESS,
  FETCH_REFERRALS_FAILED,
} from '../actions'

const defaultState = {
  isFetching: false,
  data: null,
  totalBonus: null,
}

const calculateTotalBonus = referrals =>
  reduce(referrals, (acc, r) => acc + ((r.balance || 0) * 0.02), 0)

export default function (state = defaultState, { type, payload }) {
  switch (type) {
    case FETCH_REFERRALS: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case FETCH_REFERRALS_SUCCESS: {
      return {
        ...state,
        data: payload,
        totalBonus: calculateTotalBonus(payload),
        isFetching: false,
      }
    }

    case FETCH_REFERRALS_FAILED: {
      return {
        isFetching: false,
        totalBonus: null,
        data: null,
      }
    }

    default:
      return state
  }
}
