//call payment.js const {MongoClient, ObjectID}= require('mongodb')
const createpoolDB = require('./createpooldb.js')
const createpooldb = require('./createpooldb.js')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'liquidity-pool'


const updatepool = (databaseName,_token_a,_token_b,_token_a_quantity,_token_b_quantity,callback) => {


    MongoClient.connect( connectionURL , { useUnifiedTopology: true } , (error , client) => {
        if (error)
        {
            return console.log('unable to connect');
        }
        
         const db = client.db(databaseName)

            debugger

        // check if it already exist   
        db.collection('users').findOneAndUpdate(
            { token_a :  _token_a, token_b : _token_b },
            { $set: {token_a_quantity : _token_a_quantity, token_b_quantity : _token_b_quantity } }
           ).then((result) => {
            //callback (undefined , "success")
            console.log("update running");
                        console.log(result)
                       }).catch((error) => {

                        callback (error , undefined )
                        console.log(error)
                       }); 
    })

}

module.exports = updatepool;


