var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
// Keys for accounts to issue 

// Create an object to represent the new asset


const payment =( asset_name,issuingKeys,receivingKeys,assest_quantity) => {
  var asset_name = new StellarSdk.Asset(asset_name, issuingKeys.publicKey()); 
    //transfers token to user
    server.loadAccount(receivingKeys.publicKey())
    .then(function() {
      return server.loadAccount(issuingKeys.publicKey())
    })
    .then(function(issuer) {
      var transaction = new StellarSdk.TransactionBuilder(issuer, {
        fee: 100,
        networkPassphrase: StellarSdk.Networks.TESTNET
      })
        .addOperation(StellarSdk.Operation.payment({
          destination: receivingKeys.publicKey(),
          asset: asset_name,
          amount : String(assest_quantity)
        }))
        // setTimeout is required for a transaction
        .setTimeout(100)
        .build();
      transaction.sign(issuingKeys);
      return server.submitTransaction(transaction);
    })
    .then((result) => {
      console.log('paymnt done' + asset_name);
      //console.log(result);
    })
    .catch(function(error) {
      console.log('error in payment' + asset_name);
    });
  
}


module.exports = payment;

