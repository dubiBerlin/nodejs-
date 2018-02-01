// Holt sich die utils.js Datei
const utils = require('./utils');

// expect einbinden
const expect = require("expect");


describe("Utils", ()=>{
    
    describe("#add", () =>{
        
        // Function: it eine Mocha Funktion und erstellt einen Testcase
        // param 1: Beschreibung was der Test machen soll
        // param 2: Funktion die getestet werden soll
        it('should add two numbers', () => {
            var res = utils.add(33,11);
            expect(res ).toBe(44).toBeA("number");
        });
    
        // AsyncMethod test
        // param: done sagt Mocha dass es sich um eine Async Methode handelt
        it("should async add two numbers",(done)=>{
            // utils
            utils.asyncAdd(4,3,(sum)=>{
                expect(sum).toBe(7).toBeA("number");
                done();
            })
        });
    });
    
    
    
    
    
    


    it("Should square a number", ()=>{
        var res = utils.square(5);
        expect(res ).toBe(25).toBeA("number");
    });
    

    // AsyncMethod test
    // param: done sagt Mocha dass es sich um eine Async Methode handelt
    it("should async square a number",(done)=>{
        // utils
        utils.asyncSquare(4,(sum)=>{
            expect(sum).toBe(16).toBeA("number");
            done();
        })
    });
    
});




it("Expect some values", ()=>{
    expect(12).toNotBe(11);
    expect({name:"Hans Peter"}).toEqual({name:"Hans Peter"});
    expect({name:"Hans Peter"}).toNotEqual({name:"Hans Klausen"});
    expect([2,3,4]).toInclude(4); // Schaut ob Array die Zahl 5 enthält
    expect([2,3,4]).toExclude(5); // Schaut ob Array die Zahl 5 enthält
    expect({
       name:'Hans',
        age:25,
        location: 'New York'
    }).toInclude({
        age:25
    }).toExclude({
        name:"Jonny"
    });
});



it("Check the name", ()=> {
    var user={
        location:"Los Angeles",
        age:23
    };
    var res = utils.setName(user, "Jonny Depp");
    console.log("firstname: "+res.firstname+" lastname: "+res.lastname);
    
    //expect(user).toEqual(res);
    expect(res).toInclude(
        {
        firstname:"Jonny",
        lastname:"Depp"
    });
});


