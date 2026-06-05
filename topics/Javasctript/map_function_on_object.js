var allowedAges = [25, 27, 50, 59, 15, 10];

var employeesByDepartment = {
  abc: [
    { name: "rohit", age: 15 },
    { name: "Anuj", age: 17 },
    { name: "Som", age: 19 },
    { name: "Rai", age: 10 },
  ],
  xyz: [
    { name: "xrohit", age: 55 },
    { name: "xAnuj", age: 57 },
    { name: "xSom", age: 59 },
    { name: "xRai", age: 50 },
  ],
};

// Increase age by 30 when the employee age exists in allowedAges.
// Interview point: map() should return new values instead of mutating existing objects.
const mappedEmployees = Object.keys(employeesByDepartment).map(
  (departmentKey) => {
    return employeesByDepartment[departmentKey].map((employee) => {
      if (allowedAges.includes(employee.age)) {
        return {
          ...employee,
          age: employee.age + 30,
        };
      }

      return employee;
    });
  },
);

console.log(mappedEmployees);

// Output:
// [
//   [
//     { name: "rohit", age: 45 },
//     { name: "Anuj", age: 17 },
//     { name: "Som", age: 19 },
//     { name: "Rai", age: 40 },
//   ],
//   [
//     { name: "xrohit", age: 55 },
//     { name: "xAnuj", age: 57 },
//     { name: "xSom", age: 89 },
//     { name: "xRai", age: 80 },
//   ],
// ]
