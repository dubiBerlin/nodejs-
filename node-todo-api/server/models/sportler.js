var mongoose = require("mongoose");

// NEUES MODEL
// User, email -require it - trim it- set type - set min length of 1 properties
var Sportler = mongoose.model('Sportler', {
    name:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    kindOfSport:{
        type: String,
        required: true,
        minlength: 3,
        trim: true
    }
});


module.exports = {Sportler};