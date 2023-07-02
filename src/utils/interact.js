import { toEtherValue } from "./helper.js"
import constants from '../utils/constants'
import onboard_cfg from '../utils/wallet-connect-cfg'
require('dotenv').config()
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(process.env.REACT_APP_ALCHEMY_KEY)

const contractABI = require('../contract-abi.json')
const contractAddress = constants.contractAddress

const onboard = onboard_cfg

export const mintNFT = async (tokenId, tokenPrice, amount) => {

    if (amount < 1) {
        return {
            success: false,
            txHash: null,
            status: "Please enter a valid amount"
        }
    }

    //load smart contract
    window.contract = new web3.eth.Contract(contractABI, contractAddress)


    const total = tokenPrice * amount;

    const weiPrice = web3.utils.toWei(total.toString(), "ether");

    //let gasEstimate = await web3.eth.estimateGas({to:contractAddress, data: window.contract.methods.mint(tokenId, 1).encodeABI() });

    //set up your Ethereum transaction
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        value: web3.utils.toHex(weiPrice),
        'data': window.contract.methods.mint(tokenId, amount).encodeABI() //make call to NFT smart contract 
    };


    //sign transaction via Metamask
    try {
        const txHash = await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        return {
            success: true,
            txHash: txHash,
            status: ""
        }
    } catch (error) {
        return {
            success: false,
            txHash: null,
            status: error.message
        }
    }
}

export const getTokenPrice = async (tokenId) => {

    //load smart contract
    const contract = await new web3.eth.Contract(contractABI, contractAddress)

    //const hexId = toHexString(tokenId)
    //const methods = await contract.methods
    const tokenPrice = await contract.methods._tokenPrice(tokenId).call()

    return toEtherValue(tokenPrice)
}