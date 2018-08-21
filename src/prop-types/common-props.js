import PropTypes from 'prop-types'

export const childrenPropTypes = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
])

export const routerPropTypes = PropTypes.shape({
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
})

export const classesPropTypes = PropTypes.object

export const userPropTypes = PropTypes.shape({
  isFetching: PropTypes.bool.isRequired,
  cognitoUser: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired,
  attributes: PropTypes.array,
  resendCode: PropTypes.object,
})

export const contractStatusPropTypes = PropTypes.shape({
  contractAddress: PropTypes.string.isRequired,
  currentBonus: PropTypes.number.isRequired,
  endTimestamp: PropTypes.number.isRequired,
  ethRate: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
  totalEthInvested: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  totalSupply: PropTypes.number.isRequired,
})

export const userStatusPropTypes = PropTypes.shape({
  etherWallet: PropTypes.string,
  balance: PropTypes.number,
})

export const referralsPropTypes = PropTypes.shape({
  data: PropTypes.arrayOf(PropTypes.shape({
    cognitoId: PropTypes.string.isRequired,
    balance: PropTypes.number,
  })),
  isFetching: PropTypes.bool.isRequired,
  totalBonus: PropTypes.number,
})
