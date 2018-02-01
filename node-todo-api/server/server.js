
var env = process.env.NODE_ENV || "development";

if(env == "development"){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp";
}else if(env === "test"){
    process.env.PORT = 3000;
}


const _ = require('lodash');
const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");


// mongoose von der /db/mongoose.js importieren
var {mongoose} = require("./db/mongoose");

var {Todo} = require("./models/todo");
var {User} = require("./models/user");
var {Sportler} = require("./models/sportler");
var {authenticate} = require("./middleware/authenticate");

var app = express();
// process.env.PORT wird nur bei Heroku genommen
const port = process.env.PORT || 3000;

/* use() = Middleware einbinden
 * param: bodyParser.json() 
 *        gibt eine Funktion zurück die dann die Middleware in Express ist
 **/
app.use(bodyParser.json());


// Purpose: sendet ein json an client  
// param 1: url 
// param 2: Callback funktion mit request und response Objekt
app.post("/todos", authenticate, (req, res) => {
    console.log("req user._id: "+req.user._id);
    var todo = new Todo({
       text: req.body.text,
        _creator:req.user._id
    });
    
    // In DB speichern anschließend an Clienten Mongoose JSON Objekt senden
    todo.save().then((doc)=>{
        res.send(doc);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

// Purpose: sendet ein json array mit todo objekten an clienten  
// param 1: url 
// param 2: Callback funktion mit request und response Objekt
/*app.get("/todos", (req, res) => {
    
    
    Todo.find().then((todos) => {
       res.send({todos}); 
        },(e) => {
           res.status(400).send(e);
       });
});*/


// Purpose: sendet ein json mit post request an Server  
// param 1: url 
// param 2: Callback funktion mit request und response Objekt
app.post("/sportler", (req, res) => {
    
    // Ausgabe was der Client gesendet hat
    console.log("req.body : "+req.body.name+" "+req.body.kindOfSport+" length: "+req.body.length);
        
        var arrayOfSportlern = req.body;
        var arrayOfObjSportlern = [];
        
        arrayOfSportlern.forEach((entry)=>{
            
            console.log("entry.name "+entry.name+" "+entry.kindOfSport);
            // Mongoose JSON Objekt erstellen 
            var sportler = new Sportler({
               name: entry.name,
               kindOfSport: entry.kindOfSport
            });
            
            sportler.save().then((doc)=>{
                arrayOfObjSportlern.push(doc);
            }).catch((e)=>{
                res.status(400).send(e);
            });  
        });
        
        setTimeout(function(){
            res.send(arrayOfObjSportlern);
        }, 3000);

        // In DB speichern anschließend an Clienten Mongoose JSON Objekt senden
        /*sportler.save().then((doc)=>{
            res.send(doc);
        }).catch((e)=>{
            res.status(400).send(e);
        });*/    
});

// GET /todos/12345 <== URL
/*app.get("/todos/:id", (req, res)=>{
    
    var id = req.params.id;
    
    // Ist es eine gültige id?
    if(ObjectID.isValid(id)){
        
        // Find todo objekt via id
        Todo.findById(id).then((todo)=>{
            if(todo){
                return res.send(todo);
            }else{
                console.log("400 error cannot find todo");
                return res.status(400).send("--- 400 Error --- Cannot find todo "+{});
            }
        }).catch((e) => {
            return res.status(400).send();
        });
        
        
    }else{
        console.log("---404 Error --- The following id is not valid: "+id);
        return res.status(404).send("---404 Error --- The following id is not valid: "+id);
    }
});*/

/* VIDEO VERSION */
app.get("/todos/:id", authenticate ,(req, res)=>{
    
    var id = req.params.id;
    
    // Ist es eine gültige id?
    if(!ObjectID.isValid(id)){
        return res.status(404).send();    
    }
    // Find todo objekt via id
    Todo.findOne({
        _id:id,
        _creator:req.user._id
    }).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        return res.status(400).send();
    });    
});

/* VIDEO VERSION */
app.get("/todos/", authenticate,(req, res)=>{
    
    // Find todo objekt via id
    Todo.find({
        _creator:req.user._id
    }).then((todos)=>{
        if(!todos){
            return res.status(400).send();
        }
        res.send({todos});
    }).catch((e) => {
        return res.status(400).send();
    });    
});

app.delete("/todos/:id", authenticate,(req, res)=>{
    
    
    // get the id
    var id = req.params.id;
    
    // validate the id -> not valid? return 404
    if(!ObjectID.isValid(id)){
        return res.status(404).send();    
    }
    
    // remove todo by id
    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo)=>{
        if(!todo){
            return res.status(404).send();    
        }
        //success
        res.send({todo});
    }).catch((e)=>{
        return res.status(400);
    });
});



app.patch("/todos/:id",authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ["text", "completed"]);
    
    console.log("PATCH: "+req.body.completed+" time: "+new Date().getTime());
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();    
    }
    
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    
    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, {$set: body}, {new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send(); 
        }
        res.send({todo});
        
    }).catch((e)=>{
        res.status(400).send(); 
    });
});




/*******************************************
 *                                         *
 *            USERS SECTION                *
 *                                         *
 *******************************************/

app.post("/users", (req, res) => {
    // _.pick nimmt die Werte aus dem Body für die entsprechenden Properties aus dem gesendeten
    // Json Objekt
    var body = _.pick(req.body, ["email", "password"]);
    
    /*var user = new User({
        email: body.email,
        password: body.password
    });*/
    
    // Schönere Lösung
    var user = new User(body);
    
    // then gibt den selben user zurück der save aufruft
    user.save().then(()=>{
       return user.generateAuthToken(); 
    }).then((token)=>{
        
        
        /* Nun alles für was response benötigt wird ist enthalten (user & token) .
          Der token wird im http response "header(key,value)" eingefügt und an clienten zurückgeschickt */
        res.header("x-auth",token).send(user);
    }).catch((e)=>{
        res.status(400).send("Show the ERRORR:"+e);
    });    
});



// Purpose: Calls middlware function to Find the associated user and
//          sends the user back (id and mail). 
// param1: URL
// param2: middleware function (see require)  
// param3: (req,res)
app.get("/users/me", authenticate, (req, res)=>{
    res.send(req.user);
});

// POST /users/login {email, password(hashed)}
app.post("/users/login", (req, res) => {
    
    var body = _.pick(req.body, ["email", "password"]);
    
    
    User.findByCredentials(body.email, body.password).then((user)=>{
        user.generateAuthToken().then((token)=>{
            
            res.header("x-auth",token).send(user);
            
        });
    }).catch((e)=>{
        res.status(400).send();
    });
});


app.delete("/users/me/token", authenticate,(req,res)=>{
    
    req.user.removeToken(req.token).then(()=>{
       res.status(200).send(); 
    }, ()=>{
        res.status(400).send();
    });
});




// param 1: Port 3000 
// param 2: Callback funktion
app.listen(3000, ()=>{
    console.log(`Started on port ${port}`);
});



/*var newTodo = new Todo({
    text: 'cook some coffee',
    completed: true,
    completedAt: 12
});


newTodo.save().then((doc) => {
    console.log("Saved todo", doc);
}, (e)=> {
    console.log("Unable to save todo!");
});


var secondTodo = new Todo({
    text: "    sleeeeeping  "
});

secondTodo.save().then((doc) => {
   console.log(doc); 
}, (e)=>{
    console.log("Unable to save second todo");
});



var newUser = new User({
    email: "hello@mail.com"
});

newUser.save().then((doc) => {
   console.log("user saved: "+doc); 
}, (e)=>{
    console.log("Unable to save user "+e);
});*/

// express app exportieren zum testen
module.exports = {app};
