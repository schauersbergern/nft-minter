import React, { useState, useEffect } from 'react'
import NumberInputField from './NumberInputField'
import './NFT.css'
import { mintNFT, getTokenPrice } from "../utils/interact.js"
import { importAllImages, getNotificationData } from "../utils/helper.js"
import { useNotifications } from '@web3-onboard/react'

const NFT = ({ index, item }) => {
    const [state, setState] = useState({
        priceText: "Preis: - ETH",
        ethPrice: 0,
        tokenId: -1,
        isGenerating: false,
        numberOfTokens: 0
    })

    const images = importAllImages()
    const [notifications, customNotification, updateNotify] = useNotifications()
    const [notifyPosition, setNotifyPosition] = useState('topRight')

    const sendMintFinishedNotification = async (message) => {
        const notificationData = getNotificationData(message)
        const { update, dismiss } = customNotification(notificationData)
        setTimeout(() => dismiss(), 8000)
    }

    useEffect(() => {
        const fetchData = async () => {
            const price = await getTokenPrice(index)
            setState(prevState => ({
                ...prevState,
                priceText: prevState.priceText.replace('-', price),
                ethPrice: price,
                tokenId: index
            }))
        }

        fetchData()
        setNotifyPosition('topRight')
        updateNotify({ position: 'topRight' })
    }, [index])

    const updateNrOfTokens = (tokens) => {
        setState(prevState => ({
            ...prevState,
            numberOfTokens: tokens
        }))
    }

    const onMintPressed = async (tokenId, ethPrice, numberOfTokens) => {
        setState({
            ...state,
            isGenerating: true
        })

        const status = await mintNFT(state.tokenId, state.ethPrice, state.numberOfTokens)
        sendMintFinishedNotification(status)

        setState({
            ...state,
            isGenerating: false
        })
    }

    return (
        <div className='nftFrame'>
            <img src={images[item.image]} alt=""></img>
            <div className='name'>{item.name}</div>
            <div className='status'>
                {state.priceText}
            </div>
            {
                <NumberInputField updateNrOfTokens={updateNrOfTokens}></NumberInputField>
            }
            <div className="prompt-buttons">
                <a
                    className={state.isGenerating ? 'generate-button loading' : 'generate-button'}
                    onClick={onMintPressed}
                >
                    <div className="generate">
                        {state.isGenerating ? <span className="loader"></span> : <p>Mint NFT</p>}
                    </div>
                </a>
            </div>
        </div>
    )
}

export default NFT