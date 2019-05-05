const Web3 = require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");
const abi = require('./abi.js')

require('dotenv').config()

const cryptoKittyIds = ['1477497', '1387393']
const walletAddresses = ['0xAC80f8FefE1F14F40fFf2Bf96210a5B46e0DfD26', '0xE77b8a5a3085AD31eF455F794e46FbBC3AF5cd36']

const web3 = new Web3(new HDWalletProvider(process.env.MNENOMIC, "https://mainnet.infura.io/v3/62df5323062344249adb11c3403dba29"))

void async function main() {
  // setup
  const accounts = await web3.eth.getAccounts()
  const account = accounts[0]
  const ckContract = new web3.eth.Contract(abi, '0x06012c8cf97bead5deae237070f9587f8e7a266d', {defaultAccount: account, gas: 400000, gasPrice: 10000000000 })

  // distribute some cats
  for (let i = 0; i < cryptoKittyIds.length; i++) {
    console.log(`cat ${cryptoKittyIds[i]}`);
    console.log(`account: ${account}`);
    try {
      // let approval = await ckContract.methods.approve(walletAddresses[i], cryptoKittyIds[i]).send({
      //   from: account
      // })
      let transfer = await ckContract.methods.transferFrom('0x8d3e809Fbd258083a5Ba004a527159Da535c8abA', walletAddresses[i], cryptoKittyIds[i]).send({
        from: account
      })
    } catch (error) {
      console.log(error)
    }
  }

}()

// gripes:
// approval succeeds, transfer fails
// should probably test on rinkeby but how do i get a ck on rinkeby
