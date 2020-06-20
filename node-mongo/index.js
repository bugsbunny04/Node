const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const dboper = require('./operations');
const url = 'mongodb://localhost:27017/';
const dbname = "conFusion";

MongoClient.connect(url, (err,client) => {
    assert.equal(err,null);

    console.log("Connected correctly to server");

    const db = client.db(dbname);
    const collection = db.collection('dishes');
   
    dboper.insertDocument(db, {"name":"Vadonut","description":"test"}, "dishes", (result) => {
        console.log("Insert Document: \n",result.ops);

        dboper.findDocuments(db, "dishes", (docs) => {
            console.log("Found Documents: \n",docs);

            dboper.updateDocument(db, {"name":"Vadonut"}, {"description":"Updated test"}, "dishes", (result) => {
                console.log("Updated document: \n",result.result);

                dboper.findDocuments(db, "dishes", (docs) =>{
                    console.log("Found Updated documents: \n",docs);

                    db.dropCollection("dishes", (result)=>{
                        console.log("Dropeed Collection: ",result);

                        client.close();
                    });
                });
            });
        });
    });
});