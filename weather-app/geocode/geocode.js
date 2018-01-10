

/*********** BEISPIEL *******************************************

 Beispiel von der Seite https://www.npmjs.com/package/request
 var request = require('request');
 request('http://www.google.com', function (error, response, body) {
   console.log('error:', error); // Print the error if one occurred
   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
   console.log('body:', body); // Print the HTML for the Google homepage.
 });

******************************************************************/

const request = require('request');


var geocodeAddress = (address, callback)=> {
    var encodedAddress = encodeURIComponent(address) ;
    /*
     * error response und body sind die Rückgabewerte der callback Funktion.
     */
    request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+encodedAddress,
        json:true // Der Rückgabewerte soll ein JSON Objekt sein
    }, (error, response, body) =>{

        if(error){
            callback("Unable to connect to Googles Servers", null);
        }

        if(body.status==="ZERO_RESULTS" || body.status==="OVER_QUERY_LIMIT"){
         callback("ZERO_RESULTS or OVER_QUERY_LIMIT", null);       
        }else if(body.status==="OK"){

            var formatted_address = body.results[0].formatted_address;
            var lat = body.results[0].geometry.location.lat;
            var lng = body.results[0].geometry.location.lng;
            
            var results = {
                address:formatted_address,
                long:lng,
                lat:lat
            };
            callback(undefined, results);
            
        }
    });
}

// https://api.darksky.net/forecast/29f0f3ad86fd0095b16a052b76d5cdc0/
var getWeather =( longLatObj ,callback) => {
    
    var long = longLatObj.long;
    var lat = longLatObj.lat;
    
    request({
        url: 'https://api.darksky.net/forecast/29f0f3ad86fd0095b16a052b76d5cdc0/'+long+','+lat,
        json:true // Der Rückgabewerte soll ein JSON Objekt sein
    }, (error, response, body) =>{

        if(error){
            callback("Unable to connect to Googles Servers", null);
        }

        if(body.status==="Forbidden " || response.statusCode===400 ){
         callback("Forbidden ", null);       
        }else if(response.statusCode===200){

            var summary = body.currently.summary;
            var temp = body.currently.temperature;
            
            //console.log("getWeather summary: "+summary);
            
            var results = {
                summary:summary,
                temperature:temp
            };
            callback(undefined, results);
            
        }
    });
}


module.exports.geocodeAddress = geocodeAddress;
module.exports.getWeather = getWeather;