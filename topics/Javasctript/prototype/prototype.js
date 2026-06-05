/* =================== Type 1: constructor function + prototype object ======================== */

var objProto = {
  type: "test",
  greet: function () {
    console.log(this.greeting + " world!");
  },
};

var Greeting = function (term) {
  this.greeting = term;
};

Greeting.prototype = objProto;
Greeting.prototype.constructor = Greeting;

var obj1 = new Greeting("Rohit");
obj1.greet();

// Output: Rohit world!

/* =================== Type 2: Object.create() ======================== */

var obj2 = Object.create(objProto);
obj2.greeting = "Hi";
obj2.greet();

// Output: Hi world!

/*
Interview point:
JavaScript uses prototypal inheritance. If a property does not exist on the
object itself, JavaScript checks the object's prototype chain.
*/
