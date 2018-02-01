
const {MongoClient,ObjectID} = require("mongodb");


MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client)=>{
    
    if(err){
       console.log("Unable to connect to the mongodb server");
    }
    console.log("Connected to MongoDB server");
    
    
    const db = client.db("TodoApp");
    
    
    // findOneAndUpdate(filter, update, options, callback)
    db.collection("Users").findOneAndUpdate(
        // filter nach dem gesucht wird
        {
            _id:new ObjectID("5a5e2e332012beea4a3c7445")
        },
        // update
        {
            // set setzt den Parameter auf einen bestimmten Wert
            $set:{
                name:"Sven"   
            }, 
            // $inc erhöht den Zahlenwert um angegebenen Wert
            $inc: { 
                age: -2
            } 
        },
        // param returnOriginal von options auf false damit wir das neu aktualisierte Objekt zurück bekommen 
        {
            returnOriginal:false
        }).then((result) => {
            console.log(result);
    });
    
    
    
    client.close();
    
});