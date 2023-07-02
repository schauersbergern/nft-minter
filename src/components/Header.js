import React, { useState, useEffect } from 'react'
import './Header.css'
import logo from '../imgs/bricon.png'
import constants from '../utils/constants'
import { updateStatus } from '../redux/reducer'
import { connect } from 'react-redux'
import ethers from 'ethers'
import Onboard from '@web3-onboard/core'
import onboard_cfg from '../utils/wallet-connect-cfg'
import { init, useConnectWallet } from '@web3-onboard/react'

const headerText = constants.headerText

init(onboard_cfg)

const Header = (props) => {

  const [status, setStatus] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [connected, setConnected] = useState(false);
 //const onboard = Onboard(onboard_cfg)
  
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  useEffect(() => {
    // code to be executed when the component is mounted
  }, []);

  const doConnect = async () => {
    connect();
  }

  return (
    <div className="Header">
      <div className="headerColumn">
        <img src={logo} alt="logo" />
      </div>
      <div className="headerColumn">
        <div className="headerText">
          {headerText}
        </div>
      </div>
      <div className="headerColumn">
        <div className="buttonContainer">
          {!wallet && (
            <button id="walletButton" 
            onClick={async () => {
              const walletsConnected = await connect()
              console.log('connected wallets1: ', walletsConnected)
            }}
            >
              <span>Connect Wallet</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;