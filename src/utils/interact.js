import React from 'react'
import { toEtherValue } from "./helper.js"
import constants from '../utils/constants';
require('dotenv').config()
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(process.env.REACT_APP_ALCHEMY_KEY);

const contractABI = require('../contract-abi.json')
const contractAddress = constants.contractAddress


export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "",
          address: addressArray[0],
          connected: true
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
          connected: false
        };
      }
    } else {
      return {
        address: "",
        connected: false,
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" rel="noopener noreferrer" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

  export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "",
            connected: true
          };
        } else {
          return {
            address: "",
            status: "🦊 Connect to Metamask using the top right button.",
            connected: false
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        connected: false,
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" rel="noopener noreferrer" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

  export const mintNFT = async(tokenId, tokenPrice, amount) => {

    if (amount < 1) {
      return {
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
            status: "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash
        }
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message
        }
    }
}

export const getTokenPrice = async(tokenId) => {
    
    //load smart contract
    const contract = await new web3.eth.Contract(contractABI, contractAddress)

    //const hexId = toHexString(tokenId)
    //const methods = await contract.methods
    const tokenPrice = await contract.methods._tokenPrice(tokenId).call()

    return toEtherValue(tokenPrice)
}