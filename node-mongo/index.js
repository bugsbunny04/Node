const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const dboper = require('./operations');
const url = 'mongodb://localhost:27017/';
const dbname = "conFusion";

MongoClient.connect(url).then((client) => {
    console.log("Connected correctly to server");

    const db = client.db(dbname);
    const collection = db.collection('dishes');
   
    dboper.insertDocument(db, {"name":"Vadonut","description":"test"}, "dishes")
    .then((result) => {

        console.log("Insert Document: \n",result.ops);

        return dboper.findDocuments(db, "dishes")
    })
        .then((docs) => {
            console.log("Found Documents: \n",docs);

            return dboper.updateDocument(db, {"name":"Vadonut"}, {"description":"Updated test"}, "dishes")
        })
        .then((result) => {
                console.log("Updated document: \n",result.result);

                return dboper.findDocuments(db, "dishes")
        })
        .then((docs) =>{
                    console.log("Found Updated documents: \n",docs);

            return db.dropCollection("dishes")
        })
        .then((result)=>{
                        console.log("Dropeed Collection: ",result);

                        client.close();
    })
    .catch((err) => console.log(err));                
})
.catch((err) => console.log(err));