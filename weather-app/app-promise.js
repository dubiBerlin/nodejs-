// Wir laden das installierte npm Modul namens "request"

const yargs = require('yargs');
const axios = require('axios');

//const geocode = require('./geocode/geocode.js');



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

var encodedAddress = encodeURIComponent(argv.address);

var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='+encodedAddress;

// axios.get stellt das HTTP Request
axios.get(geocodeUrl).then((response)=>{
    if(response.data.status ==="ZERORESULTS"){
        throw new Error("Unable to find the address.")
    }
    console.log(response.data);
    
    var formatted_address = response.data.results[0].formatted_address;
    var lat = response.data.results[0].geometry.location.lat;
    var long = response.data.results[0].geometry.location.lng;
            
    
    var weatherUrl = 'https://api.darksky.net/forecast/29f0f3ad86fd0095b16a052b76d5cdc0/'+long+','+lat;
    
    console.log("address: "+formatted_address);
    
    return axios.get(weatherUrl);
    
    }).then((response)=>{ // Ist die then() Methode von der axios.get(weatherUrl)
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        
        console.log(`Its currently ${temperature}. It feels like ${apparentTemperature}.`);
        
    }).catch((errorMessage)=>{

    }).catch((e)=>{
        if(e.code === "ENOTFOUND"){
            console.log("Unable to connect to API Server");
        }else{
            console.log(e.message);
        }
    });

