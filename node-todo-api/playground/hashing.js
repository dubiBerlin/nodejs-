const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


/************************************************
 *                                              *
 *        bcryptjs                              *
 *                                              *
 ************************************************/

var password = "hallo123abc!";

// Salts the pw
bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(password,salt,(err,hash)=>{
        
        // vergleiche den hash mit den password
        bcrypt.compare(password, hash, (err, res)=>{
           console.log("response2: "+res); 
        });               
   });
});

//var hashedPassword = "$2a$10$GPn1xRTeQAOASrjIhh2ONOdo2p7wkrJZjMqPdITFOAZvx3YqokfaG";

// compare password 
//bcrypt.compare(password, hashedPassword, (err, res)=>{
//   console.log("response: "+res); 
//});









/************************************************
 *                                              *
 *        jsonwebtoken                          *
 *                                              *
 ************************************************/
     
//var data = {
//    id : 10
//};


/*
 * function name : jsonwebtoken.sign
 * purpose  : erstellt webtoken der zum User zurückgeschickt wird, wenn er sich einloggt/registriert
 *            wird im Objekt User-Model in den Parameter User.tokens.token eingefügt
 * param1: data
 * param2: das secret was an den hash rangehangen wird
 */
/*var token = jwt.sign(data, "123ABC");
var decoded = jwt.verify(token, "123ABC");
console.log("token: "+token+" | decoded: ", decoded);*/

/*
var message = "I am user number 3";

var hash = SHA256(message).toString();

console.log(`Message : ${message}`);
console.log(`Hash : ${hash}`);



var data = {
    id: 4
};

// Client
var token = {
    data,
    hash: SHA256(JSON.stringify(data) + "somesecret").toString()
};


// Man in the middle
token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();


// Server
var resultHash = SHA256(JSON.stringify(token.data)+"somesecret").toString();


if(resultHash === token.hash){
    console.log("Data was not changed");
}else{
    console.log("Data was changed. Do not trust.");
    
}
*/

