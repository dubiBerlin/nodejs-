const {MongoClient,ObjectID} = require("mongodb");


var user = {name:"Ben", age:23};
var {name}=user;

var obj = new ObjectID();

console.log("NAME: "+name+" id: "+obj);



// TodoApp = Name der DB. Sie wird hier schon allein durch den Aufruf erstellt
MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client)=>{
    
    if(err){
       console.log("Unable to connect to the mongodb server");
    }
    console.log("Connected to MongoDB server");
    
    const db = client.db("TodoApp");
    
/*    db.collection('Todos').insertOne({
        text: "Something to do",
        completed: false
    }, (err, result) => {
        if(err){
            return console.log("unable to insert todo", err);    
        }
        
        console.log(JSON.stringify(result.ops, undefined, 2));
        
    });
    
     db.collection('Users').insertOne({
        name: "Johhny Walker",
        age: 39,
        location: "Los Angeles" 
    }, (err, result) => {
        if(err){
            return console.log("unable to insert user", err);    
        }
        
        console.log(JSON.stringify(result.ops, undefined, 2));
        console.log(result.ops[0]._id.getTimestamp());
    });*/
    
    client.close();
    
});