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
    
    /**
     * .find({completed:false})
     
    db.collection("Todos").find({
        _id: new ObjectID("5a5d09c12012beea4a3c6129")
    }).toArray().then((docs)=>{
        console.log("Todos");
        
        console.log(JSON.stringify(docs, undefined, 2));
        
    }, (err)=> {
        return console.log("unable to fetch todos", err);   
    });*/

    
    /*
     *  die count() Methode gibt Anzahl der Datensätze in der DB Todos zurück
     */
    db.collection("Todos").find().count().then((count)=>{
        console.log(`Todos count: ${count}`);
        
        //console.log(JSON.stringify(docs, undefined, 2));
        
    }, (err)=> {
        return console.log("unable to fetch todos", err);   
    });
    
    /*
    *
    * Suche Documents in Tabelle Users alle die den namen:Nabeel Qureshi haben
    */
   db.collection("Users").find({
        name: "Nabeel Qureshi"
    }).toArray().then((docs)=>{
       if(docs.length==0){
            console.log("No docs found.");
       }else{
            console.log("Number of docs: "+docs.length);
           
            console.log(JSON.stringify(docs, undefined, 2));
       }
        
    }, (err)=> {
        return console.log("unable to fetch todos", err);   
    });
    
    
    
    client.close();
    
});