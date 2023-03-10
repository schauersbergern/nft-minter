import React from 'react'
import NumberInputField from './NumberInputField'
import './NFT.css'
import { mintNFT, getTokenPrice } from "../utils/interact.js"
import { importAllImages } from "../utils/helper.js"
import { updateStatus } from '../redux/reducer'
import { connect } from 'react-redux'

class NFT extends React.Component {

    state = {
        priceText: "Preis: - ETH",
        ethPrice: 0,
        tokenId: -1,
        isGenerating: false,
        numberOfTokens: 0
    }

    images = importAllImages()

    async componentDidMount() {
        const price = await getTokenPrice(this.props.index)

        this.setState(prevState => ({
            priceText: prevState.priceText.replace('-', price),
            ethPrice: price,
            tokenId: this.props.index
        }))
    }

    updateNrOfTokens = (tokens) => {
        this.setState(prevState => ({
            numberOfTokens: tokens
        }))
      }

    onMintPressed = async (tokenId, ethPrice, numberOfTokens) => {

        this.setState({
            isGenerating: true
        })

        const { status } = await mintNFT(this.state.tokenId, this.state.ethPrice, this.state.numberOfTokens)

        this.props.updateStatus(status)

        this.setState({
            isGenerating: false
        })
    }


    render() {
        return (
            <div className='nftFrame'>
                <img src={this.images[this.props.item.image]} alt=""></img>
                <div className='name'>{this.props.item.name}</div>
                <div className='status'>
                    {this.state.priceText}
                </div>
                {
                    <NumberInputField updateNrOfTokens={this.updateNrOfTokens}></NumberInputField>
                }
                <div className="prompt-buttons">
                    <a
                        className={this.state.isGenerating ? 'generate-button loading' : 'generate-button'}
                        onClick={this.onMintPressed}
                    >
                        <div className="generate">
                            {this.state.isGenerating ? <span className="loader"></span> : <p>Mint NFT</p>}
                        </div>
                    </a>
                </div>
            </div>
        )
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(NFT)