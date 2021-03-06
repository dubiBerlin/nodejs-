console.log("Starting app.js");

// require holt das fs(FileSystem) und das os() Modul
const fs = require("fs");
const os = require("os");

// Zugriff auf externe Datei
// Inhalt der Datei wird sofort ausgeführt
const notes = require("./notes.js");

// Installiertes npm Modul aufrufen
const _ = require("lodash"); // <== Das Modul wird genau so aufgerufen wie es in der package.json Datei steht


// Param 1: Name der zu erstellenden Datei
// Param 2: Inhalt der Datei
//fs.appendFileSync("greeting.txt","Hello World!");


// Gibt Infos über den eingeloggten User zurück
var user = os.userInfo();

console.log("userInfo:\n"+user.username);

// Gibt keine Warnug aus
//fs.appendFileSync("userInfo.txt","Hello "+user.username+" | Home directory: "+user.homedir);

// notes.age ist der Inhalt der in module.exports eingefügt worden ist, in der notes.js Datei
//fs.appendFileSync("userInfo.txt",`Hello ${user.username}! You are ${notes.age}`);

// Rufen die Funtion addNote() auf die in der notes.js definiert und in die exports 
// Variable eingefügt worden ist 
var note = notes.addNote();
console.log("note: "+note);

var addition = notes.addNote2(4,4);
console.log("RESULT: "+addition);


// Wir benutzen die Methode isString() von lodash
console.log(_.isString("HEllo"));
console.log(_.isString(1));
console.log(_.isString(true));

// Methode _-uniq von lodash entfernt alle doppelten Einträge
var fArray = _.uniq(["Dubravko", 1, "Was geht ja",1,2,3,4]);
console.log(fArray);


console.log("Created");