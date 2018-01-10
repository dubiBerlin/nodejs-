var obj = {
    name: "Andrew",
    age : 35
};

var stringObj = JSON.stringify(obj);

console.log(typeof stringObj);
console.log(stringObj);

var personString = '{"name":"Andrew", "age":23}';


var person = JSON.parse(personString);

console.log(typeof person);
console.log(person.name+" "+person.age);
console.log("hi");

const fs = require('fs');

var originalNote = {
    title:'Some title',
    body:'Some body'
};

var originalNoteString = JSON.stringify(originalNote);
// Erstellt Datei namens notes.json mit Inhalt der gespeichert werden soll
fs.writeFileSync('notes.json', originalNoteString);
var noteString = fs.readFileSync('notes.json');
var note = JSON.parse(noteString);
console.log(typeof note);
console.log(note.title);