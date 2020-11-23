const {MongoClient, ObjectID}= require('mongodb')
const createpoolDB = require('./createpooldb.js')
const createpooldb = require('./createpooldb.js')
const payment = require('./payment.js')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'liquidity-pool'


const updatepool = async (databaseName,_token_a,_token_b,_token_a_quantity,_token_b_quantity,receivingKeys,issuingKeys,callback) => {

    MongoClient.connect( connectionURL , { useUnifiedTopology: true } , (error , client) => {
        if (error)
        {
            return console.log('unable to connect');
        }
        
         const db = client.db(databaseName)

        // check if it already exist   
        db.collection('users').findOneAndUpdate(
            { token_a :  _token_a, token_b : _token_b },
            { $set: {token_a_quantity : _token_a_quantity, token_b_quantity : _token_b_quantity } }
           ).then(async (result) => {
            //callback (undefined , "success")
            console.log("update running");
            if(result.value == null)
                {
                 let response = await createpooldb(databaseName,_token_a,_token_b,_token_a_quantity,_token_b_quantity,receivingKeys,issuingKeys)
                 console.log("response " + response);
                
                }
            else{
                payment(_token_a,receivingKeys,issuingKeys,_token_a_quantity)
                payment(_token_b,issuingKeys,receivingKeys,_token_b_quantity)
            }
            })
            // .then(()=> {
                       
            //            })
            .catch((error) => {
            callback (error , undefined )
                        //console.log(error)
            }); 
    })
}
module.exports = updatepool;


