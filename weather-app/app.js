// Wir laden das installierte npm Modul namens "request"

const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');



const argv = yargs.options({
                        a: {
                            demand: true,
                            alias: 'address',
                            describe: 'Address to fetch weather for',
                            string: true // tells yargs to allways return address as a string
                        } 
                    })
                    .help()
                    .alias('help', 'h')
                    .argv;

console.log(argv);
// param: arv.address ist ein String und wird an die geocodeAddress() Funktion übergeben.
// return params: errorMessage & results => sind RückgabeWerte der function geocodeAddress
//                die in die Callback-Funktion übergeben werden.
// return param: errorMessage ist ein String.
// return param: results ist ein Objekt was Longitude, Latitude und Adresse enthält.
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    
    if(errorMessage){
        console.log(errorMessage);
    }else{
        var address = results.address;
        var long = results.long;
        var lat = results.lat;
        console.log(JSON.stringify(results));
        
        var lonAndLatObj = {
            long:long,
            lat:lat
        };
        
        geocode.getWeather(lonAndLatObj, (errorMessage, results)=>{
            console.log("Aktuelles Wetter : "+results.summary+" Temp: "+results.temperature);
        });
    }
});





