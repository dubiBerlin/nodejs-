
var mongoose = require("mongoose");


/*
 * Mongoose Model erstellen damit Mongoose weiß wie Daten gespeichert werden 
 */

var Todo =  mongoose.model('Todo', {
    text:{
        type: String,
        required:true, // Der text Parameter muss gesetzt werden
        minlength: 1,  // String muss mindestens aus einem Zeichen bestehen
        trim: true
    },
    completed:{
        type: Boolean,
        default:false
    },
    completedAt:{
        type: Number,
        default:null
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});


module.exports = {Todo};