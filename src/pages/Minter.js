import React from 'react';
import NFT from '../components/NFT';
import { useEffect, useState } from "react";
import constants from '../utils/constants';

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
 
  useEffect(async () => {
    
  }, []);

  return (
    <div className="Minter">
        {
          constants.nfts.map((nft, index) =>
            <NFT item = {nft} index = {index}></NFT>
          )
        }
    </div>
  );
};

export default Minter;
