const fs = require("fs");
const _ = require("lodash");
const notes = require("./notes.js");
const yargs = require("yargs"); // yargs hilft dabei JSON Objekte zu erstellen usw.

console.log("App.js started");

const titleOptions = {
    describe:'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
      describe:'Body of note',
      demand: true,
      alias: 'b'
};

const yargsArgv = yargs
                  .command('add','Add a new note',{
                      title:titleOptions,
                      body:bodyOptions
                  }).
                  command('list','List all notes',{
                      title:titleOptions,
                      body:bodyOptions
                  }).
                  command('remove','Removes a note',{
                      title:titleOptions
                  }).
                  help().
                  argv; 

// process.argv nimmt Usereingabe von der CMD ein. Die Eingabe findet sich an 3. Stelle

const command = process.argv[2];

console.log("Command: ", command);
/*console.log("Process: ", process.argv);
console.log("Yargs: ", yargsArgv);*/


if(command === "add"){
   var note = notes.addNote3(yargsArgv.title, yargsArgv.body);
   
    if(note){
        console.log("Note created");
        notes.logNote(note);
    }else{
        console.log("Note title taken");   
    }       
    
}
else if(command === "remove"){
   notes.removeNote(yargsArgv.title);
}
else if(command === "read"){
    var note = notes.getNote(yargsArgv.title);
    
    if(note){
        console.log("Note found");
        notes.logNote(note);
    }else{
        console.log("Note title taken");   
    } 
}
else if(command == "list"){
    
   var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes(s).`);
    notes.printNotes(allNotes);
}

//printProcessArgv(process.argv);







/*function printProcessArgv(array){
    for(var i = 2; i < array.length; i++){
        var com = array[i];
        console.log("Command: ",com);
    }
}*/