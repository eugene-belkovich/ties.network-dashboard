import SHA3 from 'crypto-js/sha3'
import { startsWith } from 'lodash'

const sha3 = value => SHA3(value, { outputLength: 256 }).toString()

const isChecksumAddress = (address) => {
  // Check each case
  // eslint-disable-next-line no-param-reassign
  address = address.replace('0x', '')
  const addressHash = sha3(address.toLowerCase())

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 40; i++) {
    // The nth letter should be uppercase if the nth digit of casemap is 1
    if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
      (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
      return false
    }
  }
  return true
}

export const isEthAddress = (address) => {
  if (!startsWith(address, '0x')) {
    return false
  }

  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    // Check if it has the basic requirements of an address
    return false
  } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
    // If it's all small caps or all all caps, return true
    return true
  }

  // Otherwise check each case
  return isChecksumAddress(address)
}

