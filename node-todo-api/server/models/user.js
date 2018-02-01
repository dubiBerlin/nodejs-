var mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _=require("lodash");
const bcrypt = require("bcryptjs");

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true, // darf nur einmal in DB enthalten sein
        validate: {
            isAsync: false,
            validator: validator.isEmail, //validator.isEmail(value) returns true or false
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
}, {usePushEach: true});

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();
    
    return _.pick(userObject, ['_id', 'email']);
}


UserSchema.methods.generateAuthToken = function(){
    
    // this keyword für den jetzigen User
    var user   = this;
    var access = "auth";
    var token  = jwt.sign({_id: user._id.toHexString(), access}, "abc123").toString();
    
       
    user.tokens.push({
        access,
        token
    });
    
    return user.save().then(()=>{
               return token; 
           });    
};

// functioname: findByToken 
// Purpose    : sucht nach User mit entsprechender ObjectId und token und gibt ihn zurück   
// param 1    : token
UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;
    
    try{
        decoded = jwt.verify(token, "abc123");   
        
    }catch(e){
        return Promise.reject();
    }
    // User finden in db finden der diesen x-auth token gespeichert hat
    return User.findOne({
        '_id': decoded._id,
        'tokens.token' : token,
        'tokens.access':'auth'
    }); 
};
    
// functioname: pre 
// Purpose    : Mongoose middlware Funktion. Ausgeführt BEVOR ein Dokument gespeichert wird     
// param 1    : save keyword   
// param 2    : callback Funktion mit next als return wert
UserSchema.pre("save", function(next){
    var user = this;
    
    if(user.isModified("password")){
        
        var password = user.password;
        
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(password,salt,(err,hash)=>{
                user.password = hash;
                next();                   
           });
        });
    }else{
        next();
    }
});

    
// functioname: findByCredentials 
// Purpose    : Sucht User nach email und Passwort    
// param 1    : email   
// param 2    : password
UserSchema.statics.findByCredentials = function (email, password){
    
    var User = this;
    
    return User.findOne({email}).then((user)=>{
        
        // Feuert dan catch clause beim Aufrufer auf
        if(!user){
            return Promise.reject();
        }
         
        return new Promise((resolve, reject) => {
            
            bcrypt.compare(password, user.password, (err, res)=>{
               if(res){
                   resolve(user);
               }else{
                   reject(user);
               }
            });
        });
    }).catch((e) => {
        return res.status(400).send();
    }); 
};

// functioname: removeToken 
// Purpose    : Entfernt webtoken zum ausloggen.   
// param 1    : token
UserSchema.methods.removeToken = function(token){
    var user = this;
    
    /* $pull gubt den USer aus DB zurück der den selben Token enthält */
    return user.update({
            $pull:{
                tokens:{
                    token
                }
            }
        });
    
    
}


    
var User = mongoose.model('User', UserSchema);


module.exports = {User};