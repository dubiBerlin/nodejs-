const express = require('express');
const hbs = require('hbs'); // Handlebars
const fs= require('fs');


var app = express();

// partials
// registerPartials: Nimmt den Ordner der alle Partial Dateien enthält
//                   Partial Dateien enthalten html Code der in verschiedenen Dateien
//                   gleichzeitig verwendet wird
hbs.registerPartials(__dirname+'/views/partials');


// Key value Paar
// Key   : view engine
// Value : habs
// Sagt express welche view enige wir benutzen möchten
app.set('view engine', 'hbs');





// App.use mit Funktion registriert die Express-Middleware
// Param: next(): gibt express Auskunft darüber dass eine bestimmte Aktion beendet
//              worden ist und die Anwendung weiter laufen kann. 
app.use(function(req, res, next) {
    var now = new Date().toDateString();
    
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    // fs.appendFile erstellt Datei mit namen "server.log" 
    // und fügt Inhalt log ein.
    fs.appendFile('server.log', log + "\n", (err) => {
        if(err){
            console.log("Unable to append to server log.");
        }
    })
    next();
});


app.use((req, res, next)=> {
    res.render("maintenance.hbs")
    //next();
});



/* Middleware hinzufügen
   express.static: enthält absoluten Pfad zum Ordner der dem User serviert werden soll
   __dirname: enthält Pfad zum Projektordner (node-web-server) */
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
     return new Date().getFullYear();              
});

hbs.registerHelper('screamIt',(text) => {
     return text.toUpperCase();              
});


app.get('/', (req, res)=>{
    //res.send("<h1 style='color:red; font-family:sans-serif'>Hello Express!</h1>"); // wird an den Client zurückgesendet
    res.send({
       name:'Peter',
       lastname:'Maffay',
        age:23,
        likes:[
            'Biking',
            'Cities'
        ]
    });
});

app.get('/home', (req, res)=>{
    //res.send("<h1 style='color:red; font-family:sans-serif'>Hello Express!</h1>"); // wird an den Client zurückgesendet
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        pageContent: 'Some home body content',
        welcomeMessage: 'Welcome to my website'
    });
});


app.get('/about', (req, res) => {
   //res.send('About page');
    
    /* Render rendert das Template mit der entsprechenden View Engine 
       param pageTitle: 
       param currentYear:
       Parameter werden in die about.hbs Datei eingefügt*/
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});





app.get('/bad', (req, res) => {
   
    var responseJson = {
        name: 'Alfred',
        errorMessage:'404 error'
    }
    
    res.send(responseJson); 
});



// Startet den Server und im Browser 
app.listen(3000);