let transferEncodedABI = await ckContract.methods.transferFrom('0x8d3e809Fbd258083a5Ba004a527159Da535c8abA', walletAddresses[i], cryptoKittyIds[i]).encodeABI()

console.log(`transferEncodedABI: ${transferEncodedABI}`);

let tx = {
  to: ckContractAddress,
  gas: 300000,
  data: transferEncodedABI,
  nonce: nonce
}

let signedTxn = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY)
console.log(`signedTxn: ${signedTxn}`);
let signedRawTxn = signedTxn.rawTransaction
console.log(`signedRawTxn: ${signedRawTxn}`);
let sendTxn = await web3.eth.sendSignedTransaction(signedRawTxn);
console.log(`sendTxn: ${sendTxn}`);
