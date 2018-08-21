import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import Cookies from 'universal-cookie'
import rootReducer from './reducers'
import Application from './application'
import { getUrlParameter, getSubdomains } from './utils'

{
  const from = getUrlParameter('from')
  if (from) {
    const cookies = new Cookies()
    cookies.set('from', from, {
      domain: getSubdomains(),
      path: '/',
      expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)),
    })
  }
}

const history = createHistory()
history.listen(() => window.scrollTo(0, 0))
const reduxRouterMiddleware = routerMiddleware(history)

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, reduxRouterMiddleware),
)

render(
  <MuiThemeProvider theme={createMuiTheme()}>
    <Provider store={store}>
      <Application history={history} />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
)
