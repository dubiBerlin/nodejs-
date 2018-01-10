/*var square = (x) => {
    var result = x * x;
    return result;
}*/

var square = (x) => x*x;

var user = {
    name:'Andrew',
    sayHi: () => {
        console.log(arguments);
        console.log(`Hi. iam ${this.name}`);
    },
    sayHiAlt () {
        console.log(arguments);
        console.log(`Hi. iam ${this.name}`);
    }
};


console.log(square(9));
user.sayHi(1,2,3);
user.sayHiAlt();