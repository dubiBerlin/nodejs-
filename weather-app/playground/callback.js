var getUser = (id, callback) => {
    var user = {
        id:id,
        name: 'Vikram'
    };
    
    setTimeout(()=>{
        callback(user);
    }, 3000);
};

getUser(31, (user) => {
    console.log("user");
    console.log(user);
});


//https://maps.googleapis.com/maps/api/geocode/json?address=schlangenbader straße 28b 14197 Berlin
//https://npmjs.com/package/request