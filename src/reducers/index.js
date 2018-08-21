import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import user from './user.reducer'
import userStatus from './user-status.reducer'
import contract from './contract-status.reducer'
import bitcoin from './bitcoin.reducer'
import transactions from './transactions.reducer'
import referrals from './referrals.reducer'

const rootReducer = combineReducers({
  form,
  router: routerReducer,
  user,
  userStatus,
  contract,
  bitcoin,
  transactions,
  referrals,
})

export default rootReducer
