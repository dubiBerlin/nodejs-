const {ObjectID} = require("mongodb"); // ObjectID laden. Hängt viele Methoden mit ran


const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {Sportler} = require("./../server/models/sportler");



/*
 * Functionname: remove
 * purpose:      löscht alle Todo Objekte aus DB 
 
Todo.remove({}).then((result) => {
   console.log("Result: "+result); 
});*/

/*
 * Functionname: findAndRemove
 * purpose:      löscht ein Objekt in der DB, aber gibt es danach zurück zur
 *               Methode um es z.B. auszudrucken 
 */
Todo.findOneAndRemove({_id:"5a663b0b9878025f58f454ac"}).then((todo)=>{
    
});


/*
 * Functionname: findAndRemove
 * purpose:      löscht ein Objekt in der DB, aber gibt es danach zurück zur
 *               Methode um es z.B. auszudrucken 
 */
Todo.findByIdAndRemove("5a663b0b9878025f58f454ac").then((todo)=>{
   console.log(todo); 
});