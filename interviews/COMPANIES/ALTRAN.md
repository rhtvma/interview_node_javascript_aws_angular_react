# ALTRAN Interview Questions

## 1. Difference Between AngularJS and Angular 2+

AngularJS, also called Angular 1, is based on JavaScript, controllers, scopes, and two-way data binding. Angular 2+ is a complete rewrite based on TypeScript, components, modules, dependency injection, RxJS, and a faster change detection model.

Key differences:

| Topic                | AngularJS                                | Angular 2+                            |
| -------------------- | ---------------------------------------- | ------------------------------------- |
| Language             | JavaScript                               | TypeScript                            |
| Architecture         | MVC / MVVM with controllers and `$scope` | Component-based                       |
| Mobile support       | Limited                                  | Better mobile support                 |
| Performance          | Slower for large apps                    | Faster with improved change detection |
| Routing              | `ngRoute` / UI Router                    | Angular Router                        |
| Dependency injection | Available but simpler                    | More powerful hierarchical DI         |
| Data binding         | Mostly two-way                           | Property, event, and two-way binding  |

## 2. Difference Between Promises and Observables

| Promise                           | Observable                                      |
| --------------------------------- | ----------------------------------------------- |
| Emits one value or one error      | Can emit multiple values over time              |
| Starts immediately after creation | Lazy; starts when subscribed                    |
| Cannot be cancelled directly      | Can be cancelled using `unsubscribe()`          |
| Limited operators                 | Rich operators through RxJS                     |
| Good for single async result      | Good for streams, events, HTTP, WebSocket, etc. |

Example:

```js
const promise = fetch("/api/users");

const observable = this.http.get("/api/users");
```

## 3. Internal Working of Observables

An Observable represents a lazy data stream. It does not execute until a consumer calls `subscribe()`.

Basic flow:

1. Observable is created.
2. Subscriber subscribes.
3. Observable emits values using `next()`.
4. Observable may complete using `complete()`.
5. Observable may fail using `error()`.
6. Subscription can be cancelled using `unsubscribe()`.

Example:

```js
const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.complete();

  return () => {
    console.log("Cleanup logic");
  };
});

const subscription = observable.subscribe({
  next: (value) => console.log(value),
  error: (error) => console.error(error),
  complete: () => console.log("Done"),
});

subscription.unsubscribe();
```

Chaining is done with `pipe()` and operators:

```js
source$
  .pipe(
    filter((value) => value > 10),
    map((value) => value * 2),
  )
  .subscribe(console.log);
```

Cancellation happens when `unsubscribe()` is called, or automatically when operators like `take`, `takeUntil`, or Angular's `async` pipe complete the subscription.

## 4. Observable Operators and Their Uses

Common RxJS operators:

| Operator               | Use                                                      |
| ---------------------- | -------------------------------------------------------- |
| `map`                  | Transform emitted values                                 |
| `filter`               | Allow only matching values                               |
| `tap`                  | Perform side effects like logging                        |
| `switchMap`            | Cancel previous inner observable and switch to a new one |
| `mergeMap`             | Run inner observables in parallel                        |
| `concatMap`            | Run inner observables one after another                  |
| `debounceTime`         | Wait before emitting, useful for search input            |
| `distinctUntilChanged` | Ignore repeated values                                   |
| `catchError`           | Handle errors                                            |
| `takeUntil`            | Unsubscribe based on another observable                  |

Example:

```ts
this.searchControl.valueChanges
  .pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((term) => this.userService.searchUsers(term)),
  )
  .subscribe((users) => {
    this.users = users;
  });
```

## 5. What Is Lazy Loading and How Do You Achieve It?

Lazy loading means loading a feature module only when the user navigates to that route. It improves initial load time because the application does not download every module at startup.

Example:

```ts
const routes: Routes = [
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((module) => module.AdminModule),
  },
];
```

In newer standalone Angular applications:

```ts
const routes: Routes = [
  {
    path: "admin",
    loadComponent: () =>
      import("./admin/admin.component").then(
        (component) => component.AdminComponent,
      ),
  },
];
```

Benefits:

- Faster initial application load.
- Smaller main bundle.
- Better separation of features.
- Useful for large enterprise applications.
