var {User} = require("./../models/user");


// Functionname:  authenticate
// Purpose: Middleware function. needs a valid x-auth token 
//          Finds the associated user and puts it in the req object 
//          and returns it to the app.get("/users/me")method below.
// params: (req,res,next)
var authenticate = (req, res, next)=>{
    
    var  token = req.header("x-auth");
    
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.Reject();
        }
        req.user = user;
        req.token = token;
        console.log("authenticate ends here")
        next(); // gives up to the caller => app.get("/users/me")
    }).catch((e)=>{
       res.status(401).send(); 
    });
};


module.exports = {authenticate}