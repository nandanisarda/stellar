//check id the token is already in the db 
            // if yes dont create trust 

            // if nno ccreate trust 

//trust ctreated 
//transfer equilanet guestglt coin to the sender 
//transfer 0.3% to tthe issuer
// save amount's 99.7% in database 
//amout should be sttring while passing in pay function 


// bitcoin-cli generatetoaddress 11 "1fZPZa7KMRcBywukZgaGvdCa3HhCLo4x8"
// bitcoin-cli getaddressinfo "1fZPZa7KMRcBywukZgaGvdCa3HhCLo4x8"

//bitcoin-cli getreceivedbyaddress "1fZPZa7KMRcBywukZgaGvdCa3HhCLo4x8"


// coin was not in the pool
  // First, the receiving account must trust the asset
    //either way 
    // Second, the issuing account actually sends a payment using the asset
  
  // pass tokens alphabatically sorted 
// if both the trust are not created delete the pool created in db

const StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
const updatepool= require ('./updatepool')

const admin = require ('./admin')


var issuingKeys = StellarSdk.Keypair
  .fromSecret('SBLEO5URYNTC42LNCFXSUGRBTZ7INB3D6ON2TGHKTLX4E6C3PUQ4FKVP');
//console.log(issuingKeys);
var receivingKeys = StellarSdk.Keypair
  .fromSecret('SAFFFITIKQ7DWJVMDK7MEKVO2N4LGHSY2PU4DFLUVLNZFDP7UB73LLI7');

const databaseName = 'liquidity-pool'
const _token_a= "alok"
const _token_b= "nupura" 
const _token_a_quantity= 100 
const _token_b_quantity = 1000

//admin (issuingKeys,receivingKeys, _token_a,String(0.0003*_token_a_quantity))
const asyncfun = async () => {
  let result= await updatepool (databaseName,_token_a,_token_b,_token_a_quantity,_token_b_quantity,receivingKeys,issuingKeys)
  console.log('async worked');
}

asyncfun();