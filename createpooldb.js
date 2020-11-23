const {MongoClient, ObjectID}= require('mongodb')
const createtrust = require ('./createtrust')
const connectionURL = 'mongodb://127.0.0.1:27017'

const createpooldb = async (databaseName, _token_a, _token_b,_token_a_quantity,_token_b_quantity,receivingKeys,issuingKeys) => {
  MongoClient.connect( connectionURL , { useUnifiedTopology: true } , (error , client) => {
    if (error)
    {
        return console.log('unable to connect');
    }
    
     const db = client.db(databaseName)
       // create liquidity  pool
     db.collection('users').insertOne({
       token_a : _token_a,
       token_a_quantity : _token_a_quantity ,
       token_b : _token_b ,
       token_b_quantity : _token_b_quantity,
       rate_per_token_a: _token_b_quantity / _token_a_quantity ,
       rate_per_token_b : _token_a_quantity / _token_b_quantity ,
       }).then((result) =>{
        //callback (undefined , "success")
        console.log('pool created ')
        createtrust  (receivingKeys,issuingKeys,_token_b, _token_a, _token_a_quantity, _token_b_quantity)
        
        //createtrust  (issuingKeys,receivingKeys,_token_a, _token_a_quantity)
        
        // console.log(result.ops);
       }).catch( error)
       {
         //callback(error , undefined)
         console.log(error);
       }

  })
}

module.exports = createpooldb;
