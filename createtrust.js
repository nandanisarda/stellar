var StellarSdk = require('stellar-sdk');
const payment = require('./payment')

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  
const createtrust = (receivingKeys,issuingKeys,token_a,token_b ,_token_a_quantity, _token_b_quantity) => {

  var asset = new StellarSdk.Asset(token_a, issuingKeys.publicKey());
  var asset2 = new StellarSdk.Asset(token_b, issuingKeys.publicKey());
  server.loadAccount(receivingKeys.publicKey())
  .then(function(receiver) {
     var transaction = new StellarSdk.TransactionBuilder(receiver, {
        fee: 100,
       networkPassphrase: StellarSdk.Networks.TESTNET
    })
      .addOperation(StellarSdk.Operation.changeTrust({
        asset: asset
      }))
      .addOperation(StellarSdk.Operation.changeTrust({
        asset: asset2
      }))
      .setTimeout(100)
      .build();
    transaction.sign(receivingKeys);
    return server.submitTransaction(transaction);
  })
  .then((result) => {
    payment(token_a,receivingKeys,issuingKeys,_token_a_quantity)
    payment(token_b,issuingKeys,receivingKeys,_token_b_quantity)
      console.log("trust created for "+ asset);
  } )
  .catch(function(error) {
    console.error('Error ' ,error);
  });
}

module.exports = createtrust;

