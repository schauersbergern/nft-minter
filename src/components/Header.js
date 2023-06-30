import React from 'react'
import './Header.css'
import logo from '../imgs/bricon.png'
import constants from '../utils/constants'
import { updateStatus } from '../redux/reducer'
import { connect } from 'react-redux'

import Onboard from '@web3-onboard/core'
import onboard_cfg from '../utils/wallet-connect-cfg'

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

  onboard = Onboard(onboard_cfg)

  componentDidMount() {
    
  }

  connectWallet = async () => {
    try {
        const wallets = await this.onboard.connectWallet();
        console.log(wallets);
    } catch (error) {
        console.error('Error in connectWallet', error);
    }
}

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
          <div className="buttonContainer">
            <button id="walletButton" onClick={this.connectWallet}>
                <span>Connect Wallet</span>
            </button>
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