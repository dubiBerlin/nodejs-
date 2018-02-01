const request = require("supertest");
const expect = require("expect");


// Wir holen uns die app Methode aus server.js
// geht auch so===> var app = require("./server,js");
var app = require("./server").app;

describe("Server", ()=>{
    
    describe("GET", ()=>{
        
        it("should return hello world response", (done)=>{
           request(app)
            .get("/")
            .expect(404)
            //.expect("Hello World")
            /*.expect({
               error:"Page not found."
           })*/
            .expect((res)=>{
               expect(res.body).toInclude({
                   error:"Page not found.",
               name:"Todo App v1.0"
               });
           })
            .end(done);
        });
        
        
        
    });
    
    
    describe("GET/users", ()=>{
        /*
         * Wir testen die Methode die ein Array mit User Objekten zurückgibt an den Client
         */
        it("should return a user array", (done)=>{
           request(app)
            .get("/users")
            .expect(200)
            //.expect("Hello World")
            /*.expect({
               error:"Page not found."
           })*/
            .expect((res)=>{
               expect(res.body).toInclude({
                   name:"name"+0,
                    age: 20
               });
           })
            .end(done);
        });
    });
});


