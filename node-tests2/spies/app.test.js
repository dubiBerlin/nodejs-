const expect = require("expect");
const rewire = require("rewire");

// Wir laden die Datei app.js und rewire stellt noch zwei MEthoden zur Verfügung
var app = rewire("./app");
/// Diese beiden Methoden werden durch rewire an das Objekt app übertragen
//app.__set__   
//app.__get__




describe("App", () => {
    
    var db = {
        saveUser: expect.createSpy();
    };
    
    app.__set__("db");
    
    
   
    it("Should call spy correctly", () => {
       
        var spy = expect.createSpy();
        spy("Jonny", 25);
        expect(spy).toHaveBeenCalledWith("Jonny", 25);
    });
    
    
    it("should call saveUser with user object", () => {
        var email = "test@mailcom";
        var password = "123wer";
        
        app.handleSignup(email, password);
        
        expect(db.saveUser).toHaveBeenCalledWith({email,password});
    });
    
    
});