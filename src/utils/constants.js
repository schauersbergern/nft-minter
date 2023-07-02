import logo from '../imgs/bricon.png'

const constants = {
  imageFolder: './imgs',
  logo: logo,
  nfts: [
    { name: 'Investor NFT', image: 'nft1.jpeg' },
    { name: 'Shopowner NFT', image: 'nft2.jpeg' },
    { name: 'Blackrose Club Member NFT', image: 'nft3.jpeg' }
  ],
  //contractAddress : "0xCac0dbc551d134e7ECD531C61f787eF6D70A9747",
  contractAddress: "0x347875B456dbcbddCEC3556ECe2925Be0E9275B4",
  headerText: "BlackRose Club Mint",
  description: "Mint your BlackRose Club NFT which give you unique benefits in our Metaverse",
  chains: [{
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/1`
  },
  {
    id: '0x5',
    token: 'ETH',
    label: 'Goerli',
    rpcUrl: `https://goerli.infura.io/v3/5`
  }],
  chainConfig: {
    '0x1': {
      etherScanTxUrl: 'https://etherscan.io/tx/'
    },
    '0x5': {
      etherScanTxUrl: 'https://goerli.etherscan.io/tx/'
    }
  },
  notificationTexts: {
    success: "✅ Check out your transaction on Etherscan: ",
    error: "😥 Something went wrong: "
  },
}

export default constants