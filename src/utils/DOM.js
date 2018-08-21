/* eslint-disable no-restricted-syntax, func-names */

export const isVisible = (function () {
  let stateKey
  let eventKey
  const keys = {
    hidden: 'visibilitychange',
    webkitHidden: 'webkitvisibilitychange',
    mozHidden: 'mozvisibilitychange',
    msHidden: 'msvisibilitychange',
  }

  for (stateKey in keys) {
    if (stateKey in document) {
      eventKey = keys[stateKey]
      break
    }
  }
  return function (c) {
    if (c) document.addEventListener(eventKey, c)
    return !document[stateKey]
  }
}())
