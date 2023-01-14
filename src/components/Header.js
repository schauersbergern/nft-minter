import React, { useEffect, useState } from 'react'
import './Header.css'
import logo from '../imgs/bricon.png'
import { connectWallet, getCurrentWalletConnected } from "../utils/interact.js"
import constants from '../utils/constants'
import { store } from '../redux/store'
import { updateStatus } from '../redux/action'

const headerText = constants.headerText

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: "",
      walletAddress: "",
      connected: false
    };
  }

  componentDidMount() {
    this.getCurrentWalletConnected();
    this.addWalletListener();
  }

  getCurrentWalletConnected = async () => {
    const { address, connected } = await getCurrentWalletConnected();
    this.setState({
      walletAddress: address,
      connected: connected
    });
  };

  connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    this.setState({
      walletAddress: walletResponse.address,
      connected: walletResponse.connected
    });
  };

  addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          this.setState({
            walletAddress: accounts[0]
          })
          store.dispatch(updateStatus(""))
        } else {
          this.setState({
            walletAddress: "",
          })
          store.dispatch(updateStatus("🦊 Connect to Metamask using the top right button."))
        }
      });
    } else {
      store.dispatch(updateStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      )
      )
    }
  };

  render() {
    const globalState = store.getState()
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
          <div className="headerContainer">
            <button id="walletButton" onClick={this.connectWalletPressed}>
              {this.state.walletAddress.length > 0 ? (
                `Connected: ${String(this.state.walletAddress).substring(0, 6)}...${String(this.state.walletAddress).substring(38)}`
              ) : (
                <span>Connect Wallet</span>
              )}
            </button>
            <p id="status">
              {globalState.status}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;