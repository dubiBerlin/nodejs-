// Testen von express apps mit https://github.com/visionmedia/supertest

const express = require("express");

var app = express();

app.get("/", (req, res)=>{
    //res.status(200).send("Hello World");
    res.status(404).send({
       error:"Page not found.",
       name:"Todo App v1.0"
    });
});


/* GET /users gibt ein Array von usern zurück */
app.get("/users", (req, res) => {
    var users = getUsers();
    res.status(200).send(users);
    /*res.status(200).send({
        name:"Jonny",
        age:40
    },{
        name:"Roy",
        age:23
    },{
        name:"Daniel",
        age:40
    });*/
});


function getUsers(){
    var users = [];
    for(var i = 0; i < 3; i++ ){
        var user={
            name:"name"+i,
            age: 20+i
        }
        users.push(user);
    }
    return users;
}


app.listen(3000);
module.exports.app = app;
