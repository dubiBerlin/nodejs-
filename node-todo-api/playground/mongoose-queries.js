const {ObjectID} = require("mongodb"); // ObjectID laden. Hängt viele Methoden mit ran


const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");


var id = "5a6253816aad6436d83cf32811111";

// ObjectID.isValid überprüft ob es gültige ObjectID ist
if(!ObjectID.isValid(id)){
    console.log("ID not valid");
    return;
}


/*
 * find() ohne Parameter sucht nach allen Todos
 * 
 */
Todo.find({
    
    _id: id // MOngoose konvertiert String id in ===>> new ObjectID("5a625204412fc20dbcf9e100");

}).then((todos)=> { // Gibt ein array von Todo Objekten zurück
    
    console.log("Array: "+todos.length+"\ntodos: "+todos);
    
});


/*
 * function name : findOne
 * purpose  :gibt nur ein Document zurück und zwar das erste welches gefunden wird
 *
 */
Todo.findOne({
    
    _id: id // MOngoose konvertiert String id in ===>> new ObjectID("5a625204412fc20dbcf9e100");

}).then((todo)=> {
    
    console.log(todo);
    
});
console.log("\n\n\nABSTAND\n\n\n");

/*
 * function name: fundById
 */
Todo.findById(id).then((todo)=>{
    
    if(todo){
        console.log("\nFind Todo by Id: "+todo);    
    }else{
        console.log("did not find ID ");
    }
    
}).catch((e) => console.log(e));





