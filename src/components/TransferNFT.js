import React from 'react';
import GetAccount from '../hooks/GetAccount';
import GetContract from '../hooks/GetContract';
import GetAuction from '../hooks/GetAuction';
import GetSigner from '../hooks/GetSigner';
import { ethers } from 'ethers';

 const TransferNFT = () => {

    const contract = GetContract();
    const account = GetAccount();
    const auction = GetAuction();
    const signer = GetSigner();

    const approveNft = async() => {
        await contract.approve(account,9);
    }

    //Pass props as the listid from auction contract
    const transferNft = async() => {
        const owner = await contract.ownerOf(9);
        console.log(owner);
        const tx = await signer.sendTransaction({
            to: owner,
            value : ethers.utils.parseEther('0.001'), //Pass amount decided by the seller in the auction contract
        })
        await contract.transferFrom(owner,account,9);
        console.log(tx);
    }

    return ( 
        <div>
            <button onClick={approveNft}>Approve Transfer</button>
            <button onClick={transferNft}>Transfer NFT</button>
        </div>
     );
 }
  
 export default TransferNFT;