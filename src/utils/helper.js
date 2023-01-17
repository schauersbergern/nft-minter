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