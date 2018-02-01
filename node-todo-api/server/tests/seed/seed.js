
const {ObjectID} = require("mongodb");
const jwt = require("jsonwebtoken");

const {Todo} = require("./../../models/todo");
const {User} = require("./../../models/user");


const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id:userOneId,
    email: "test@mail.com",
    password:"userOnePass",
    tokens:[{
        access:'auth',
        token:jwt.sign({_id:userOneId, access:'auth'}, "abc123").toString()
    }]
},{
    _id:userTwoId,
    email: "hanspeter@mail.com",
    password:"peterzweimeter",
    tokens:[{
        access:'auth',
        token:jwt.sign({_id:userTwoId, access:'auth'}, "abc123").toString()
    }]
}];

/* Dummy Objekte für die mongoDB */
const todos = [{
    _id:new ObjectID(),
    text: "First test todo",
    _creator:userOneId
},{
    _id:new ObjectID(),
    text: "Second test todo",
    completed: true,
    completedAt: 12234,
    _creator:userTwoId
}];


/*
 * beforeEach() richtet die DB für Testzwecke ein.
 * Erst wenn diese Methode fertig ist, werden die nachfolgenden TestMethoden ausgeführt.
 */
const populateTodos = (done)=> {
    
    /* Löscht alle Todos aus der DB weil Testmethode davon ausgeht dass sich
       nur ein Todo Document in der DB befindet und zwar das im Test neu erstellte.
       Also ist die Annahme in der Testmoethode dass die DB leer ist  */
    Todo.remove({}).then(()=>{
        Todo.insertMany(todos);   
    }).then(()=>{
        done();
    });
};


// functioname: populateUsers 
// Purpose    : Löscht alles aus DB. Fügt anschließend die zwei Users aus dem Array in DB ein    
// return value: Promise.all Funktion die erst zurückgibt wenn beiden Users erfolgreich in DB gespeichert wurden 
const populateUsers = (done)=>{
    User.remove({}).then(()=>{
       var userOne = new User(users[0]) .save();
       var userTwo = new User(users[1]) .save();
        
       return Promise.all([userOne, userTwo])
    }).then(()=>{
        done();
    });
};


module.exports = {todos, populateTodos, users, populateUsers};