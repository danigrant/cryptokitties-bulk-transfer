const Web3 = require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");
const esmImport = require('esm')(module);
const { OpenSeaPort, Network } = esmImport('opensea-js');

require('dotenv').config()

const cryptoKittyIds = ['1477497', '1387393']
const walletAddresses = ['0xAC80f8FefE1F14F40fFf2Bf96210a5B46e0DfD26', '0xE77b8a5a3085AD31eF455F794e46FbBC3AF5cd36']

const provider = new HDWalletProvider(process.env.MNENOMIC, "https://mainnet.infura.io/v3/62df5323062344249adb11c3403dba29");
const web3 = new Web3(provider)

const ckContractAddress = '0x06012c8cf97bead5deae237070f9587f8e7a266d'

const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main
})

void async function main() {
  // setup
  const accounts = await web3.eth.getAccounts()
  const account = accounts[0]

  for (let i = 0; i < walletAddresses.length; i++) {
    if (!cryptoKittyIds[i]) { console.log(`no cryptokitty for ${walletAddresses[i]}`); }

    console.log(`now transferring cryptokitty #${cryptoKittyIds[i]} to ${walletAddresses[i]} from ${account}`);

    try {
      const transactionHash = await seaport.transferOne({
        asset: { tokenId: cryptoKittyIds[i], tokenAddress: ckContractAddress },
        fromAddress: account,
        toAddress: walletAddresses[i]
      })
    } catch (error) {
      console.log(error);
    }
  }
}()
