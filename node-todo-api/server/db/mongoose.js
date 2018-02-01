var mongoose = require("mongoose");


// Welche promisse lib wird genutzt
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp", {
    useMongoClient:true
});


// mongoose Variable exportieren
module.exports = {
    // mongoose: mongoose
    mongoose
}