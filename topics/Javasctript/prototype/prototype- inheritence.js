var Person = function (name, dob, job) {
  this.name = name;
  this.dob = dob;
  this.job = job;
};

var rohit = new Person("Rohit", 1993, "Software Developer");
console.log(rohit);

Person.prototype.calculateAge = function (fromYear) {
  console.log(fromYear - this.dob);
};

Person.prototype.location = "YNR";

rohit.calculateAge(2019);

// Output:
// Person { name: 'Rohit', dob: 1993, job: 'Software Developer' }
// 26

/*
delete rohit.location;
console.log(rohit.location); // YNR

Reason:
location is not rohit's own property. It is inherited from Person.prototype.
*/

/*
delete Person.prototype.location;
console.log(rohit.location); // undefined

Reason:
Deleting the property from the prototype removes it from the prototype chain.
*/
