// const MongoClient = require('mongodb').MongoClient;
// const uri = "";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const mongooose = require('mongoose')

mongooose.connect("mongodb+srv://detonator22:uxzCvq1o2tZ9U6sp@cluster0.z6tgh.mongodb.net/searchmoviedatabase?retryWrites=true&w=majority", { useNewUrlParser : true, useUnifiedTopology : true }, (err) => 
{
   if(!err)
   {
       console.log("Connected to the database");
   }
   else
   {
       console.log(err);
   }
})

const userModel = require("./user.model")