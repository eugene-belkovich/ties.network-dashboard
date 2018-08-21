import { round } from 'lodash'

export const weiToEth = 1000000000000000000
export const formatBalance = balance => round((balance || 0) / weiToEth, 2).toLocaleString()
