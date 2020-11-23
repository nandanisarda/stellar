var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  const admin = async (receivingKeys,issuingKeys, asset_name,amount) => {
    var asset_name = new StellarSdk.Asset(asset_name, issuingKeys.publicKey());

    // First, the receiving account must trust the asset
    server.loadAccount(receivingKeys.publicKey())
      .then(function(receiver) {
        var transaction = new StellarSdk.TransactionBuilder(receiver, {
          fee: 100,
          networkPassphrase: StellarSdk.Networks.TESTNET
        })
          // The `changeTrust` operation creates (or alters) a trustline
          // The `limit` parameter below is optional
          .addOperation(StellarSdk.Operation.changeTrust({
            asset: asset_name
          }))
          // setTimeout is required for a transaction
          .setTimeout(100)
          .build();
        transaction.sign(receivingKeys);
        return server.submitTransaction(transaction);
      })
      .then((result) => {
          console.log('trust for admin created ' + result);
      })
    
      //Second, the issuing account actually sends a payment using the asset
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
            amount: String(amount)
          }))
          // setTimeout is required for a transaction
          .setTimeout(100)
          .build();
        transaction.sign(issuingKeys);
        return server.submitTransaction(transaction);
      })
      .then((result) => {
        console.log('payment done  for admin ' + result);
    })
      .catch(function(error) {
        console.error('Error ', error);
      });
}
// Create an object to represent the new asset
module.exports = admin;