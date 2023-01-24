import React from 'react';
import NFT from '../components/NFT';
import constants from '../utils/constants';

const Minter = (props) => {

  return (
    <div className="Minter">
        {
          constants.nfts.map((nft, index) =>
            <NFT item={nft} index={index} key={index}></NFT>
          )
        }
    </div>
  );
};

export default Minter;
