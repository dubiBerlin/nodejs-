const expect = require("expect");
const request = require("supertest");

/* Laden der express app Funktion aus der server.js Datei
 * ../server = ein Ordner zurück und dann die server.js ansprechen
 */
const {app} = require("./../server");
const {Todo} = require("./../models/todo");
const {User} = require("./../models/user");
const {ObjectID} = require("mongodb");
const {todos, populateTodos, users, populateUsers} = require("./seed/seed");

///* Dummy Objekte für die mongoDB */
//const todos = [{
//    _id:new ObjectID(),
//    text: "First test todo"
//},{
//    _id:new ObjectID(),
//    text: "Second test todo",
//    completed: true,
//    completedAt: 12234
//}];
//
//
///*
// * beforeEach() richtet die DB für Testzwecke ein.
// * Erst wenn diese Methode fertig ist, werden die nachfolgenden TestMethoden ausgeführt.
// */
//beforeEach((done)=> {
//    
//    /* Löscht alle Todos aus der DB weil Testmethode davon ausgeht dass sich
//       nur ein Todo Document in der DB befindet und zwar das im Test neu erstellte.
//       Also ist die Annahme in der Testmoethode dass die DB leer ist  */
//    Todo.remove({}).then(()=>{
//        Todo.insertMany(todos);   
//    }).then(()=>{
//        done();
//    });
//    
//});
beforeEach(populateUsers);
beforeEach(populateTodos);

describe("POST /todos",() => {
    it("should create a new todo", (done) => {
       
        var text = "Test todo text"; 
        
        request(app).
            post("/todos").
            set("x-auth", users[0].tokens[0].token).
            send({text}). // {text} = {text:text} Daten senden mit dem Request. supertest erstellt ein json Objekt
            expect(200).
            expect((res)=>{
                expect(res.body.text).toBe(text);
            }).
            end((err, res) => {
               if(err){
                  return done(err);
               }
            
                /* Request an mongodb stellen um zu gucken ob Todo mit obrigen text Variable gespeichert wurde.
                   find() Methode gibt alle Todos zurück */
                Todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1); 
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e)=>done(e));
            });
    });
    
    it("Should not create todo with invalid body data", (done)=>{
        
        var text = "Test todo text"; 
        
        request(app).
            post("/todos").
            set("x-auth", users[0].tokens[0].token).
            send({}). 
            expect(400).
            end((err, res) => {
               if(err){
                  return done(err);
               }
            
                /* Request an mongodb stellen um zu gucken ob Todo gespeichert wurde.
                   find() Methode gibt alle Todos zurück */
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2); 
                    done();
                }).catch((e)=>done(e));
            });
    });
});



/*describe("GET /todos", ()=> {
    it("should get all todos", (done)=> {
       request(app).
        get("/todos").
        set("x-auth", users[0].tokens[0].token).
        expect(200).
        expect((res) => {
           expect(res.body.todos.length).toBe(0);
        }).
        end(done);
    });
});*/


//5a6253816aad6436d83cf328
describe("GET /todos/:id", ()=> {
    it("should return todo doc", (done)=> {
       request(app).
        get(`/todos/${todos[0]._id.toHexString()}`). // get("/todos/id") _id einfügen
        set("x-auth", users[0].tokens[0].token).
        expect(200).
        expect((res) => {
           expect(res.body.todo.text).toBe(todos[0].text); 
       }).end(done);
    });
    
    it("should not return todo doc created by other user", (done)=> {
       request(app).
        get(`/todos/${todos[1]._id.toHexString()}`). // get("/todos/id") _id einfügen
        set("x-auth", users[0].tokens[0].token).
        expect(404).
        end(done);
    });
    
    it("should return 404 if todo not found", (done)=> {
        
        var hexId = new ObjectID().toHexString();
        
       request(app).
        get(`/todos/${hexId}`). // get("/todos/id") _id einfügen
        set("x-auth", users[0].tokens[0].token).
        expect(404).
        end(done);
    });
    
    it("should return 404 if ObjectID not valid", (done)=> {
        
       request(app).
        get(`/todos/123Id`). // get("/todos/id") _id einfügen
        set("x-auth", users[0].tokens[0].token).
        expect(404).
        end(done);
    });
});


describe("DELETE /todos/:id", ()=>{
    it("shoould delete todo by id", (done) => {
        
        var hexId = todos[0]._id.toHexString();
        
       request(app).
        delete(`/todos/${hexId}`).
        set("x-auth", users[0].tokens[0].token).
        expect(200).
        expect((res) => {
          expect(res.body.todo._id).toBe(hexId);
          //expect(res.body.todo.text).toBe(todos[0].text);
       }).
       end((err, res)=>{
           if(err){
               return done(err);
           }
           
           // query database using findById toNotExist
           Todo.findById(hexId).then((todo)=>{
    
                expect(todo).toNotExist();
               done();

           }).catch((e) => console.log(e));
       });
    });
    
     it("shoould remove a todo", (done) => {
        
        var hexId = todos[0]._id.toHexString();
        
       request(app).
        delete(`/todos/${hexId}`).
        set("x-auth", users[1].tokens[0].token).
        expect(404).
        end((err, res)=>{
           if(err){
               return done(err);
           }
           
           // query database using findById toNotExist
           Todo.findById(hexId).then((todo)=>{
               expect(todo).toExist();
               done();
           }).catch((e) => console.log(e));
       });
    });
    
    it("should return 404 if todo not found", (done)=>{
        var hexId = new ObjectID().toHexString();
        
       request(app).
        delete(`/todos/${hexId}`). // get("/todos/id") _id einfügen
        set("x-auth", users[1].tokens[0].token).
        expect(404).
        end(done);
    });
    
    it("should return 404 if object id is invalid", (done)=>{
        request(app).
        delete(`/todos/123Id`). // get("/todos/id") _id einfügen
        set("x-auth", users[1].tokens[0].token).
        expect(404).
        end(done);
    });
});


describe("PATCH /todos/:id", ()=>{
    it("should update the todo ", (done)=>{
        
        var hexId = todos[0]._id.toHexString();
        
        var text = "New updated text from postman"
        
        request(app).
         patch(`/todos/${hexId}`).
        set("x-auth", users[0].tokens[0].token).
         send({
            text,
            completed:true
        }).
         expect(200).
         expect((res)=>{
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA("number");
         }).
         end(done);
        
    });
    
    it("should not update todo created by other user ", (done)=>{
        
        var hexId = todos[0]._id.toHexString();
        
        var text = "New updated text from postman"
        
        request(app).
         patch(`/todos/${hexId}`).
        set("x-auth", users[1].tokens[0].token).
         send({
            text,
            completed:true
        }).
         expect(404).
         end(done);
        
    });
    
    it("should clear completedAt when todo is not completed ", (done)=>{
        
        var hexId = todos[1]._id.toHexString();
        var text = "New updated text from postman for second item"
        
        request(app).
         patch(`/todos/${hexId}`).
        set("x-auth", users[1].tokens[0].token).
         send({
            text,
            completed:false
        }).
         expect(200).
         expect((res)=>{
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toNotExist();
         }).
         end(done);
    });
});


describe("GET /users/me", ()=> {
    it("should return user if authenticated", (done)=>{
        request(app)
         .get("/users/me")
         .set("x-auth", users[0].tokens[0].token)
         .expect(200)
         .expect((res)=>{
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
    });
    
    it("should return 401 if not authenticated", (done)=>{
        request(app)
         .get("/users/me")
         .set("x-auth", "22122")
         .expect(401)
         .expect((res)=>{
            expect(res.body).toEqual({});
        })
        .end(done);
    });
});


describe("POST /users", ()=> {
    it("should create a user", (done)=>{
        var email = "example@mail.de";
        var password = "123abc";
        
        request(app)
         .post("/users")
         .send({
            email,
            password
         })
         .expect(200)
         .expect((res)=>{
            expect(res.headers["x-auth"]).toExist();
            expect(res.body._id).toExist();
            expect(res.body.email).toBe(email);
        })
        .end((err)=>{
            if(err){
                return done(err);
            }
            User.findOne({email}).then((user)=>{
               expect(user).toExist();
               expect(user.password).toNotBe(password);
               done();
            }).catch((e)=>{
                done();
            });
        });
    });
    
    it("should return validation errors if request invalid", (done)=>{
        request(app)
         .post("/users")
         .send({
            email:"and",
            password:123
        })
        .expect(400)
        .end(done);
    });
});



describe("POST /users/login", ()=> {
    it("should login user and return auth token", (done)=>{
        
        request(app)
         .post("/users/login")
         .send({
            email:users[1].email,
            password:users[1].password
         })
         .expect(200)
         .expect((res)=>{
            expect(res.headers["x-auth"]).toExist();
        })
        .end((err)=>{
            if(err){
                return done(err);
            }
            // DB ZUGRIFF
            User.findById(users[1]._id).then((user)=>{
                expect(user.tokens[0]).toInclude({
                    access: "auth",
                    token:res.headers['x-auth']
                });
                done();
            }).catch((e)=>{
                done();
            });
        });
    });
    
    it("should invalid login", (done)=>{
        request(app)
         .post("/users/login")
         .send({
            email:"and",
            password:123
        })
        .expect(400)
        .expect((res)=>{
            expect(res.headers["x-auth"]).toNotExist();
        })
        .end((err)=>{
            if(err){
                return done(err);
            }
            // DB ZUGRIFF
            User.findById(users[1]._id).then((user)=>{
                expect(user.tokens.length).toBe(0);
                done();
            }).catch((e)=>{
                done();
            });
        });
    });
});


describe("DELETE /users/me/token", ()=> {
    it("should remove auth token on logout", (done)=>{
       
        request(app)
        .delete("/users/me/token")
        .set("x-auth",users[0].tokens[0].token)
        .expect(200)
        .end((err,res)=>{
           if(err){
               return done(err);
           } 
            User.findById(users[0]._id).then((user)=>{
               expect(user.tokens.length).toBe(0);
                done();
            }).catch((e)=>done());
        });
        
    });
    
    
});