const {MongoClient,ObjectID} = require("mongodb");



// TodoApp = Name der DB. Sie wird hier schon allein durch den Aufruf erstellt
MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client)=>{
    
    if(err){
       console.log("Unable to connect to the mongodb server");
    }
    console.log("Connected to MongoDB server");
    
    
    const db = client.db("TodoApp");
    
    // delete many
    /*db.collection("Todos").deleteMany({text: "Eat lunch"}).then((result)=>{
        console.log(result);
    });*/
    
    
    // delete one document
    /*db.collection("Todos").deleteOne({text: "Something to do"}).then((result)=>{
        console.log(result);
    });*/
    
    
    
    // find one and delete
    /*db.collection("Todos").findOneAndDelete({completed:false}).then((result)=>{
        console.log(result);
    });*/
    
    
    db.collection("Users").deleteMany({name: "Nabeel Qureshi"}).then((result)=>{
        //console.log(result);
    });
    
    var id = "";
    
    db.collection("Users").find().toArray().then((docs)=>{
        
        
         id = docs[0]._id;
        console.log("id: "+id+"   name: "+docs[0].name);
        
        db.collection("Todos").findOneAndDelete({_id:new ObjectID(id)}).then((result)=>{
            console.log(result);
        });
        
    });
        
      console.log("Hello2")  
        
    /*db.collection("Todos").findOneAndDelete({_id:new ObjectID(id)}).then((result)=>{
        console.log(result);
    });*/
    
    client.close();
    
});