const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject)=>{
        request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+address,
            json:true // Der Rückgabewerte soll ein JSON Objekt sein
        }, (error, response, body) =>{

            if(error){
                reject("Unable to connect to Googles Servers");
            }

            if(body.status==="ZERO_RESULTS" || body.status==="OVER_QUERY_LIMIT"){
                reject("ZERO_RESULTS or OVER_QUERY_LIMIT");       
            }else if(body.status==="OK"){

                var formatted_address = body.results[0].formatted_address;
                var lat = body.results[0].geometry.location.lat;
                var lng = body.results[0].geometry.location.lng;

                var results = {
                    address:formatted_address,
                    long:lng,
                    lat:lat
                };
                resolve( results);
            }
        });
    });
};


geocodeAddress('19146').then((location)=>{
    console.log("Found: "+JSON.stringify(location),2);
}).catch((errorMessage)=>{
    console.log(errorMessage);
});