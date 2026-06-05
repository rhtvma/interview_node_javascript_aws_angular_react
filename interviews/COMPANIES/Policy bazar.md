# Policy Bazar Interview Questions

## JavaScript Basics

### 1. Difference Between `var`, `let`, and `const`

| Feature        | `var`                    | `let`                             | `const`                           |
| -------------- | ------------------------ | --------------------------------- | --------------------------------- |
| Scope          | Function scoped          | Block scoped                      | Block scoped                      |
| Re-declaration | Allowed                  | Not allowed in same scope         | Not allowed in same scope         |
| Re-assignment  | Allowed                  | Allowed                           | Not allowed                       |
| Hoisting       | Hoisted with `undefined` | Hoisted but in temporal dead zone | Hoisted but in temporal dead zone |

Example:

```js
var a = 10;
let b = 20;
const c = 30;
```

Use `const` by default, `let` when reassignment is needed, and avoid `var` in modern JavaScript.

### 2. Can We Modify a `const` Object?

```js
const array1 = {};
array1.age = 40;
```

Yes, this works.

`const` prevents reassignment of the variable, not mutation of the object value.

```js
const user = {};
user.age = 40; // allowed

user = {}; // TypeError
```

### 3. Sort an Array and Its Time Complexity

```js
const numbers = [5, 2, 9, 1];
numbers.sort((a, b) => a - b);

console.log(numbers); // [1, 2, 5, 9]
```

Time complexity is generally `O(n log n)`, though the exact implementation depends on the JavaScript engine.

### 4. What Does `array.filter()` Do?

`filter()` creates a new array containing elements that pass a condition.

```js
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter((number) => number % 2 === 0);

console.log(evenNumbers); // [2, 4]
```

It does not modify the original array.

### 5. Create a Custom `array.filter()` Function

```js
Array.prototype.myFilter = function (callback, thisArg) {
  const result = [];

  for (let index = 0; index < this.length; index += 1) {
    if (Object.prototype.hasOwnProperty.call(this, index)) {
      const value = this[index];

      if (callback.call(thisArg, value, index, this)) {
        result.push(value);
      }
    }
  }

  return result;
};

const numbers = [1, 2, 3, 4];
const evenNumbers = numbers.myFilter((number) => number % 2 === 0);

console.log(evenNumbers); // [2, 4]
```

### 6. Find Maximum Occupancy of a Number

Question:

```js
const array = [2, 2, 3, 6, 3, 2, 7, 8, 2, 9];
```

Find the number that appears the maximum number of times.

Answer:

```js
function findMaximumOccurrence(numbers) {
  const frequency = {};
  let maxNumber = null;
  let maxCount = 0;

  for (const number of numbers) {
    frequency[number] = (frequency[number] || 0) + 1;

    if (frequency[number] > maxCount) {
      maxCount = frequency[number];
      maxNumber = number;
    }
  }

  return {
    number: maxNumber,
    count: maxCount,
  };
}

console.log(findMaximumOccurrence([2, 2, 3, 6, 3, 2, 7, 8, 2, 9]));
// { number: 2, count: 4 }
```

Time complexity: `O(n)`.

### 7. Execute Two Functions at a Time

Question:

```js
const array1 = [func1, func2, func3, func4, func5, func6, func7, func8];
```

Execute two async functions at a time. When any one completes, execute the next.

Answer:

```js
async function runWithConcurrency(tasks, limit = 2) {
  const results = [];
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < tasks.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await tasks[currentIndex]();
    }
  }

  const workers = Array.from({ length: limit }, () => worker());
  await Promise.all(workers);

  return results;
}

runWithConcurrency([func1, func2, func3, func4, func5, func6, func7, func8], 2)
  .then(console.log)
  .catch(console.error);
```

### 8. Factorial Using Recursion

```js
function factorial(number) {
  if (number < 0) {
    throw new Error("Factorial is not defined for negative numbers");
  }

  if (number === 0 || number === 1) {
    return 1;
  }

  return number * factorial(number - 1);
}

console.log(factorial(5)); // 120
```

## SQL Questions

### 9. Query Using `GROUP BY`

Example: count employees in each department.

```sql
SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY department_id;
```

### 10. Find Maximum Salary

```sql
SELECT MAX(salary) AS max_salary
FROM employees;
```

### 11. Find Second Highest Salary

```sql
SELECT MAX(salary) AS second_highest_salary
FROM employees
WHERE salary < (
  SELECT MAX(salary)
  FROM employees
);
```

Alternative:

```sql
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;
```

### 12. Find Nth Highest Salary

Using `LIMIT` and `OFFSET`:

```sql
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET n - 1;
```

Example for third highest salary:

```sql
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 2;
```

Using window functions:

```sql
SELECT salary
FROM (
  SELECT
    salary,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS salary_rank
  FROM employees
) ranked_salaries
WHERE salary_rank = 3;
```

### 13. How to Sort `GROUP BY` Data in MySQL

Use `ORDER BY` after `GROUP BY`.

```sql
SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY department_id
ORDER BY employee_count DESC;
```

## JavaScript Output Questions

### 14. Output Question 1

Question:

```js
console.log("a");

abc = () => {
  "use strict";
  setTimeout(() => {
    console.log("b");
  }, 0);
};

console.log("c");
abc();
console.log("d");
```

Output:

```txt
a
c
d
b
```

Reason: `setTimeout` is asynchronous, so `b` is printed after the synchronous code completes.

### 15. Output Question 2

Question:

```js
console.log("a");

abc = (a, b) => {
  "use strict";
  console.log(a + b);
};

console.log("c");
abc(2, 6);
console.log("d");
```

Output:

```txt
a
c
8
d
```

Reason: There is no asynchronous code here, so execution happens line by line.

## Promises, Async/Await, and Observables

### 16. What Is a Promise?

A Promise represents a future value from an asynchronous operation. It can be in one of three states:

- Pending.
- Fulfilled.
- Rejected.

Example:

```js
const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Done");
  } else {
    reject(new Error("Failed"));
  }
});

promise
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

### 17. What Is `async` / `await`?

`async` / `await` is syntax built on top of Promises. It makes asynchronous code easier to read.

```js
async function getUsers() {
  try {
    const response = await fetch("/api/users");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

### 18. Difference Between Promises and Observables

| Promise                      | Observable                                              |
| ---------------------------- | ------------------------------------------------------- |
| Emits a single value         | Can emit multiple values                                |
| Executes immediately         | Executes only after subscription                        |
| Cannot be cancelled directly | Can be cancelled with `unsubscribe()`                   |
| Native JavaScript            | Provided by libraries like RxJS                         |
| Good for HTTP one-time calls | Good for streams, events, WebSocket, and reactive flows |

## Node.js and JavaScript Concepts

### 19. What Are Design Patterns?

Design patterns are reusable solutions to common software design problems.

Common examples:

- Singleton.
- Factory.
- Observer.
- Strategy.
- Module.
- Middleware.
- Dependency injection.

In Node.js, common patterns include module, callback, event emitter, middleware, and singleton.

### 20. What Is the Event Loop?

The event loop is the mechanism that allows JavaScript to handle asynchronous operations even though the main JavaScript thread is single-threaded.

Basic flow:

1. Synchronous code runs first.
2. Async work is delegated to the runtime or browser APIs.
3. Microtasks like Promises are processed.
4. Macrotasks like timers are processed.
5. The loop continues.

Example:

```js
console.log("start");

setTimeout(() => console.log("timeout"), 0);

Promise.resolve().then(() => console.log("promise"));

console.log("end");
```

Output:

```txt
start
end
promise
timeout
```

### 21. What Is Scope Collision?

Scope collision happens when two or more variables with the same name conflict in the same or overlapping scope.

Example:

```js
var name = "Amit";

function printName() {
  var name = "Rahul";
  console.log(name);
}
```

In larger applications, scope collision can cause accidental overwrites or unexpected values.

Ways to avoid it:

- Use `let` and `const`.
- Keep variables block scoped.
- Use modules.
- Avoid global variables.
- Use clear naming.

### 22. How Do You Format Date in JavaScript?

Using native JavaScript:

```js
const date = new Date();
const formattedDate = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
}).format(date);

console.log(formattedDate);
```

Using a package:

```js
import moment from "moment";

console.log(moment().format("DD-MMM-YYYY"));
```

Note: Moment.js is still seen in older projects, but for new projects many teams prefer native `Intl`, `date-fns`, `Day.js`, or Luxon.

## Dependency Injection

### 23. What Is Dependency Injection in Node.js and Angular?

Dependency injection means providing required dependencies from outside a class or function instead of creating them directly inside it.

Angular example:

```ts
@Injectable({ providedIn: "root" })
export class UserService {
  getUsers() {
    return this.http.get("/api/users");
  }

  constructor(private http: HttpClient) {}
}
```

Node.js example:

```js
function createUserService(userRepository) {
  return {
    getUser(id) {
      return userRepository.findById(id);
    },
  };
}
```

Benefits:

- Easier testing.
- Loose coupling.
- Better maintainability.
- Easier replacement of implementations.

## Angular Questions

### 24. In AngularJS, How Do You Share Data Between Two Controllers?

Use a shared service.

```js
app.service("UserDataService", function () {
  this.user = {};
});

app.controller("FirstController", function ($scope, UserDataService) {
  $scope.user = UserDataService.user;
});

app.controller("SecondController", function ($scope, UserDataService) {
  $scope.user = UserDataService.user;
});
```

Avoid relying on global variables for controller communication.

### 25. How Do `@Input` and `@Output` Work?

`@Input` passes data from parent to child.

Child component:

```ts
@Input() userName = '';
```

Parent template:

```html
<app-user-card [userName]="selectedUser.name"></app-user-card>
```

`@Output` sends events from child to parent.

Child component:

```ts
@Output() saved = new EventEmitter<string>();

saveUser() {
  this.saved.emit('saved');
}
```

Parent template:

```html
<app-user-card (saved)="onUserSaved($event)"></app-user-card>
```

### 26. Flow of `@Input` and `@Output`

Parent to child:

```html
<app-child [item]="parentItem"></app-child>
```

Child to parent:

```html
<app-child (selected)="handleSelected($event)"></app-child>
```

Child to child:

1. Child A emits data to parent using `@Output`.
2. Parent stores that data.
3. Parent passes the data to Child B using `@Input`.

Example:

```html
<app-child-a (selected)="selectedItem = $event"></app-child-a>
<app-child-b [item]="selectedItem"></app-child-b>
```

For unrelated components, use a shared service with RxJS `Subject` or `BehaviorSubject`.

### 27. Angular Scenario: Dropdown Data and Count From Another Microservice

Scenario:

- First microservice returns dropdown data.
- Second microservice returns count data based on the dropdown data.

Approach:

1. Create one service for dropdown API calls.
2. Create another service for count API calls.
3. Inject both services into the component or into a facade service.
4. Use RxJS to call the second API after the first API returns.

Example:

```ts
@Injectable({ providedIn: "root" })
export class DropdownFacadeService {
  constructor(
    private dropdownService: DropdownService,
    private countService: CountService,
  ) {}

  getDropdownWithCounts() {
    return this.dropdownService.getDropdownItems().pipe(
      switchMap((items) =>
        this.countService.getCounts(items.map((item) => item.id)).pipe(
          map((counts) =>
            items.map((item) => ({
              ...item,
              count: counts[item.id] || 0,
            })),
          ),
        ),
      ),
    );
  }
}
```

Component:

```ts
this.dropdownFacadeService.getDropdownWithCounts().subscribe((items) => {
  this.dropdownItems = items;
});
```

This uses dependency injection because the component does not create service objects manually. Angular injects them.

Types of dependency in this scenario:

- Service dependency: Component depends on services.
- Functional dependency: Count API depends on the result of dropdown API.
- Data dependency: Count request requires dropdown item identifiers.
