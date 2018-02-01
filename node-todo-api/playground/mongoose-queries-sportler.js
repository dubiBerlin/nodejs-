const {ObjectID} = require("mongodb"); // ObjectID laden. Hängt viele Methoden mit ran


const {mongoose} = require("./../server/db/mongoose");
const {Sportler} = require("./../server/models/sportler");

var id = "5a6043c69ebb7f73dccd0ea8";



Sportler.find({
    kindOfSport:"Boxer"
}).then((sportlers) => {
    if(sportlers.length===0){
        console.log("Sportlers not found!");   
    }else{
        console.log(sportlers);
    }
});

Sportler.find({
    _id:id
}).then((sportlers)=>{
    
    if(sportlers){
        console.log(sportlers);   
    }else{
        console.log("Not found");
    }
});



Sportler.findById(id).then((sportler)=>{
   if(!sportler){
       return console.log("Could not find spotler");
   } 
    console.log("Could  find spotler:\n"+sportler);
});








