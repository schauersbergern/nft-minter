import React, { useEffect, useState } from 'react'
import './Header.css'
import logo from '../imgs/bricon.png'
import { connectWallet, getCurrentWalletConnected } from "../utils/interact.js"
import constants from '../utils/constants'
import { updateStatus } from '../redux/reducer'
import { connect } from 'react-redux'

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
          this.props.updateStatus("")
        } else {
          this.setState({
            walletAddress: "",
          })
          this.props.updateStatus("🦊 Connect to Metamask using the top right button.")
        }
      });
    } else {
      this.props.updateStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      )
    }
  };

  render() {
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
              {this.props.status}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      status: state.status.value
  }
}

const mapDispatchToProps = dispatch => {
  return {
      updateStatus: (status) => dispatch(updateStatus(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)