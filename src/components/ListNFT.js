import React from 'react';
import GetAccount from '../hooks/GetAccount';
import GetContract from '../hooks/GetContract';
import GetAuction from '../hooks/GetAuction';
import { useState } from 'react';

const ListNFT = () => {

    const contract = GetContract();
    const account = GetAccount();
    const auction = GetAuction();

    const[amount,setAmount] = useState('');

    console.log(auction);

    const ListNFT = async(tokenId) => {
        var owner = await contract.ownerOf(tokenId);
        console.log(account,owner)
        if(account.toString() === owner.toString()){
            await auction.addList(tokenId,amount);
        }else{
            console.log("Not the owner of the NFT");
        }
    }

    const showNFT = async() => {
        var count = await auction.getCount();
        count = count.toString();
        console.log(count);
        await auction.showList(count).then(console.log);
    }

    showNFT();

    return ( 
        <div>
            <input onChange={(e)=>setAmount(e.target.value)} />
            <button onClick={()=>ListNFT(10)} >List NFT</button>
        </div>
     );
}
 
export default ListNFT;