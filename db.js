
const {MongoClient, ObjectID}= require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'liquidity-pool'


var token_quantity = 10
var equivalent_lumnes = 1
MongoClient.connect( connectionURL , { useUnifiedTopology: true } , (error , client) => {
        if (error)
        {
            return console.log('unable to connect');
        }
        


        
         const db = client.db(databaseName)
        


        // check if it already exist   
        db.collection('users').findOne({ token_a : "dia", token_b: "eth" } , (error, task) => {
             console.log(task)
             if (task == null)
                {
                    db.collection('users').findOne({ token_a : "dia", token_b: "eth" } , (error, task) => {
                        if (task== null)
                        {
                            //create pool
                            //create both trust
                        }
                        else 
                        {
                                //swap coins
                        }
                    })
                }
             //call payment   
            })

})