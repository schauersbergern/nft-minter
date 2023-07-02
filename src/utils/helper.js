import constants from './constants'

const config = constants

const Web3Utils = require('web3-utils')

export const toEtherValue = (wei) => {
    const ether = Web3Utils.fromWei(wei, 'ether')
    return ether
}

export const toHexString = (intValue) => {
    return Web3Utils.toHex(intValue)
}

export const importAllImages = () => {
    let images = {}
    const r = require.context('../imgs', false, /\.(png|jpe?g)$/)
    r.keys().map((item, index) => ( images[item.replace('./', '')] = r(item) ))
    return images
}

export const getNotificationData = (message) => {

  let messageText = '';
  let onClick = () => {};

  const txUrl = config.chainConfig[window.ethereum.chainId].etherScanTxUrl

  if (message.success) {
    messageText = config.notificationTexts.success + txUrl + message.txHash
    onClick = () => window.open(txUrl + message.txHash)
  } else {
    messageText = config.notificationTexts.error + message.status
  }

  return {
    eventCode: 'dbUpdate',
    type: 'hint',
    message: messageText,
    onClick: onClick
  }
}