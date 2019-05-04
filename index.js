const Web3 = require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");
const abi = require('./abi.js')

require('dotenv').config()

const cryptoKittyIds = [1437926, 1448284]

const web3 = new Web3(new HDWalletProvider(process.env.MNENOMIC, "https://mainnet.infura.io/v3/62df5323062344249adb11c3403dba29"))

void async function main() {
  // setup
  const accounts = await web3.eth.getAccounts()
  const account = accounts[0]
  const ckContract = new web3.eth.Contract(abi, '0x06012c8cf97bead5deae237070f9587f8e7a266d', {defaultAccount: account, gas: 200000 })

  // lets go
  for (let i = 0; i < cryptoKittyIds.length; i++) {
    console.log(`getting ${cryptoKittyIds[i]}`);
    ckContract.methods.approve('0xAC80f8FefE1F14F40fFf2Bf96210a5B46e0DfD26', cryptoKittyIds[i]).send()
    ckContract.methods.transferFrom(account, '0xAC80f8FefE1F14F40fFf2Bf96210a5B46e0DfD26', cryptoKittyIds[i]).send()
  }
}()
