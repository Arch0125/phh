import logo from './logo.svg';
import './App.css';
import GetContract from './hooks/GetContract';
import GetAccount from './hooks/GetAccount';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import {MetaData} from './Metadata'
import ListNFT from './components/ListNFT';
import TransferNFT from './components/TransferNFT';

function App() {

  const contract = GetContract();
  const account = GetAccount();
  const[img, setImg] = useState('');

  console.log(MetaData['2']);  

  const mintNft = async() => {
    var metadata = JSON.stringify(MetaData['2']);
    console.log(metadata);
    const mint = await contract.awardItem(account,'QmR2MrwE1GQTKGZk4XGiT3YskHpTDiWttLBPj7UuxMZGHy');
    console.log(mint);
  }

  const getNft = async() => {
    const uri = await contract.tokenURI(1);
    setImg(uri);
  }

  getNft();
  console.log(img);

  var url = 'https://ipfs.io/ipfs/' + img;

  return (
    <div>
      <ConnectButton/>
      <button onClick={()=>mintNft()} >Claim NFT</button>
      <img src={url} />
      <ListNFT/>
      <TransferNFT/>
    </div>
  );
}

export default App;
