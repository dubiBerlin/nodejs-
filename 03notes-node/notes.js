console.log("Starting notes.js");

// in jeder Datei hat man Zugriff auf das Objekt "module"
//console.log(module);

// in exports kann man Zeugs einfügen und von woanders diesen Inhalt aufrufen
module.exports.age= 37;


// Funktion exportieren
module.exports.addNote = ()=>{
    console.log("addNote in notes.js");
    return "New note";
};

module.exports.addNote2 = (a, b)=>{
    
    var c = a + b;
    
    return c;
};


const fs = require('fs');



var fetchNotes  = () => {
    try{
        console.log("try success: ");
        console.log(typeof notes);
        var notesString = fs.readFileSync('notes-data.json');
        return notes = JSON.parse(notesString);
    }catch(e){
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes)); 
}


var addNote3 = (title, body) => {
    console.log("addNote3 "+title+" "+body +" *************");
    var notes =fetchNotes();
    var note = {
        title,
        body
    };
    
    // filter ist Array Funktion die nach doppeltendatensätzen sucht.
    // Wenn 
    var duplicateNotes = notes.filter((note) => {
        return note.title === title;                                  
    });
    
    // did we find some duplicate titles?
    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);   
        return note;
    }
};

var getNote = (title) => {
    console.log("Getting note: ", title);
    
    var notes = fetchNotes();
    
    var duplicateNotes = notes.filter((note) => {
        return note.title === title;                                  
    });
    
    return duplicateNotes[0];
}


var removeNote = (title) => {
    console.log("Removed note: ", title);
    
    var notes = fetchNotes();
    
    var filteredNotes = notes.filter((note) => note.title!==title); 
    saveNotes(filteredNotes);
    
    return notes.length !== filteredNotes.length;
}

var getAll = () => {
    console.log("Getting all notes");
    return fetchNotes();
}

var logNote = (note) => {
    debugger;
    console.log("--");
    console.log("Title: "+note.title);
    console.log("Body: "+note.body);
}

var printNotes = (notes)=>{
    notes.forEach((note)=>{
        logNote(note);
    });
}

module.exports = {
    addNote3,
    getNote,
    getAll,
    removeNote,
    logNote,
    printNotes
};