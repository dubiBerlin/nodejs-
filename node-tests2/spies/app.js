var db = require("./db.js");


module.exports.handleSignup = (email, password) => {
    //Check if email already exists
    // save the user to the database
    db.saveUser({
        email:email,
        password: password
    });
    // send the welcome email
}