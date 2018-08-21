/* eslint-disable no-undef */
export const dataLayerPush = (event) => {
  if (process.env.REACT_APP_ENV === 'prod') {
    try {
      dataLayer.push(event)
    } catch (e) {
      console.log(e)
    }
  }
}
