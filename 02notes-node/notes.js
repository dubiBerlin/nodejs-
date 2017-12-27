console.log("Starting notes.js");

// in jeder Datei hat man Zugriff auf das Objekt "module"
console.log(module);

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