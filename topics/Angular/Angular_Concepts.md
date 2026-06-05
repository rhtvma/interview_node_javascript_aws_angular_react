# Angular - Complete Interview Preparation Guide

A comprehensive guide covering essential Angular concepts for interview preparation.

---

## Table of Contents

1. [What is Angular?](#what-is-angular)
2. [Angular Architecture](#angular-architecture)
3. [Components](#components)
4. [Modules](#modules)
5. [Services and Dependency Injection](#services-and-dependency-injection)
6. [Directives](#directives)
7. [Pipes](#pipes)
8. [Routing](#routing)
9. [Forms](#forms)
10. [Observables and RxJS](#observables-and-rxjs)
11. [Change Detection](#change-detection)
12. [Angular CLI](#angular-cli)
13. [Best Practices](#best-practices)
14. [Common Interview Questions](#common-interview-questions)

---

## What is Angular?

**Angular** is a TypeScript-based open-source web application framework developed and maintained by Google.

### Key Features

- **Component-Based Architecture**: Build UI with reusable components
- **TypeScript**: Strongly typed superset of JavaScript
- **Two-Way Data Binding**: Automatic synchronization
- **Dependency Injection**: Built-in DI system
- **Routing**: Single Page Application (SPA) navigation
- **RxJS**: Reactive programming with Observables
- **CLI**: Powerful command-line interface
- **Testing**: Built-in testing support

### Angular vs AngularJS

| Feature | AngularJS (1.x) | Angular (2+) |
|---------|-----------------|--------------|
| **Language** | JavaScript | TypeScript |
| **Architecture** | MVC | Component-based |
| **Mobile** | Not optimized | Mobile-friendly |
| **Performance** | Slower | Faster |
| **CLI** | No | Yes |
| **Dependency Injection** | Basic | Advanced |

### Why Angular?

✅ **Enterprise-Ready**: Robust and scalable
✅ **Full Framework**: Everything included
✅ **TypeScript**: Type safety and better tooling
✅ **Google Support**: Backed by Google
✅ **Large Community**: Extensive resources
✅ **Consistent Updates**: Regular releases
✅ **Testing**: Built-in testing tools

---

## Angular Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────┐
│           Angular Application           │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │         Root Module               │ │
│  │         (AppModule)               │ │
│  │                                   │ │
│  │  ┌─────────────────────────────┐ │ │
│  │  │    Feature Modules          │ │ │
│  │  │  ┌──────────┐ ┌──────────┐ │ │ │
│  │  │  │Component │ │Component │ │ │ │
│  │  │  └──────────┘ └──────────┘ │ │ │
│  │  │  ┌──────────┐ ┌──────────┐ │ │ │
│  │  │  │ Service  │ │Directive │ │ │ │
│  │  │  └──────────┘ └──────────┘ │ │ │
│  │  └─────────────────────────────┘ │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Building Blocks

1. **Modules**: Organize application
2. **Components**: UI building blocks
3. **Templates**: HTML views
4. **Services**: Business logic
5. **Directives**: DOM manipulation
6. **Pipes**: Data transformation
7. **Routing**: Navigation

---

## Components

### What is a Component?

A **component** controls a portion of the screen (view) and consists of:
- TypeScript class (logic)
- HTML template (view)
- CSS styles (presentation)

### Component Structure

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',           // HTML tag
  templateUrl: './user.component.html',  // Template
  styleUrls: ['./user.component.css']    // Styles
})
export class UserComponent {
  // Component logic
  name: string = 'John Doe';
  age: number = 30;
  
  constructor() { }
  
  greet(): void {
    console.log(`Hello, ${this.name}!`);
  }
}
```

### Component Metadata

```typescript
@Component({
  selector: 'app-user',              // Component selector
  templateUrl: './user.component.html',  // External template
  // OR
  template: '<h1>{{ title }}</h1>',  // Inline template
  
  styleUrls: ['./user.component.css'],   // External styles
  // OR
  styles: ['h1 { color: blue; }'],   // Inline styles
  
  providers: [UserService],          // Component-level services
  changeDetection: ChangeDetectionStrategy.OnPush  // Change detection
})
```

### Component Lifecycle

```
Creation → Initialization → Change Detection → Destruction

1. constructor()
2. ngOnChanges()
3. ngOnInit()
4. ngDoCheck()
5. ngAfterContentInit()
6. ngAfterContentChecked()
7. ngAfterViewInit()
8. ngAfterViewChecked()
9. ngOnDestroy()
```

### Component Communication

```typescript
// Parent to Child: @Input
export class ChildComponent {
  @Input() data: string;
}

// Child to Parent: @Output
export class ChildComponent {
  @Output() notify = new EventEmitter<string>();
  
  sendData() {
    this.notify.emit('Hello Parent');
  }
}
```

---

## Modules

### What is a Module?

A **module** is a container for organizing related components, directives, pipes, and services.

### Root Module

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [      // Components, Directives, Pipes
    AppComponent,
    UserComponent
  ],
  imports: [           // Other modules
    BrowserModule,
    FormsModule
  ],
  providers: [         // Services
    UserService
  ],
  bootstrap: [AppComponent]  // Root component
})
export class AppModule { }
```

### Feature Module

```typescript
// user.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [           // Make available to other modules
    UserListComponent
  ]
})
export class UserModule { }
```

### Module Types

1. **Root Module**: AppModule (bootstrap)
2. **Feature Module**: Organize by feature
3. **Shared Module**: Common components/directives
4. **Core Module**: Singleton services
5. **Routing Module**: Navigation configuration

---

## Services and Dependency Injection

### What is a Service?

A **service** is a class that contains business logic, data access, or utility functions.

### Creating a Service

```typescript
// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Singleton service
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';
  
  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
```

### Dependency Injection

```typescript
// Component using service
import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user-list',
  template: `
    <ul>
      <li *ngFor="let user of users">{{ user.name }}</li>
    </ul>
  `
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  
  // Inject service via constructor
  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }
}
```

### Provider Scope

```typescript
// Root level (singleton)
@Injectable({
  providedIn: 'root'
})

// Module level
@NgModule({
  providers: [UserService]
})

// Component level (new instance per component)
@Component({
  providers: [UserService]
})
```

---

## Directives

### What are Directives?

**Directives** are classes that add behavior to elements in Angular applications.

### Types of Directives

1. **Component Directives**: Components with templates
2. **Structural Directives**: Change DOM structure (*ngIf, *ngFor)
3. **Attribute Directives**: Change appearance/behavior (ngClass, ngStyle)

### Structural Directives

```html
<!-- *ngIf -->
<div *ngIf="isLoggedIn">
  Welcome, {{ userName }}!
</div>

<div *ngIf="isLoggedIn; else loginTemplate">
  Dashboard
</div>
<ng-template #loginTemplate>
  <p>Please login</p>
</ng-template>

<!-- *ngFor -->
<ul>
  <li *ngFor="let user of users; let i = index">
    {{ i + 1 }}. {{ user.name }}
  </li>
</ul>

<!-- *ngSwitch -->
<div [ngSwitch]="role">
  <p *ngSwitchCase="'admin'">Admin Panel</p>
  <p *ngSwitchCase="'user'">User Dashboard</p>
  <p *ngSwitchDefault>Guest View</p>
</div>
```

### Attribute Directives

```html
<!-- ngClass -->
<div [ngClass]="{'active': isActive, 'disabled': isDisabled}">
  Content
</div>

<div [ngClass]="getClasses()">Content</div>

<!-- ngStyle -->
<div [ngStyle]="{'color': textColor, 'font-size': fontSize + 'px'}">
  Styled Text
</div>

<!-- ngModel (two-way binding) -->
<input [(ngModel)]="userName" type="text">
```

### Custom Directive

```typescript
// highlight.directive.ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight: string = 'yellow';
  
  constructor(private el: ElementRef) { }
  
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight);
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }
  
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

```html
<!-- Usage -->
<p appHighlight="lightblue">Hover over me!</p>
```

---

## Pipes

### What are Pipes?

**Pipes** transform data in templates for display purposes.

### Built-in Pipes

```html
<!-- DatePipe -->
<p>{{ today | date }}</p>
<p>{{ today | date:'short' }}</p>
<p>{{ today | date:'dd/MM/yyyy' }}</p>

<!-- UpperCasePipe / LowerCasePipe -->
<p>{{ name | uppercase }}</p>
<p>{{ name | lowercase }}</p>

<!-- CurrencyPipe -->
<p>{{ price | currency }}</p>
<p>{{ price | currency:'EUR' }}</p>

<!-- DecimalPipe -->
<p>{{ pi | number:'1.2-2' }}</p>

<!-- PercentPipe -->
<p>{{ ratio | percent }}</p>

<!-- JsonPipe -->
<pre>{{ user | json }}</pre>

<!-- SlicePipe -->
<p>{{ text | slice:0:10 }}</p>

<!-- AsyncPipe -->
<p>{{ data$ | async }}</p>
```

### Custom Pipe

```typescript
// reverse.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    return value.split('').reverse().join('');
  }
}
```

```html
<!-- Usage -->
<p>{{ 'Hello' | reverse }}</p>  <!-- olleH -->
```

### Pipe with Parameters

```typescript
// truncate.pipe.ts
@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 10, trail: string = '...'): string {
    return value.length > limit 
      ? value.substring(0, limit) + trail 
      : value;
  }
}
```

```html
<!-- Usage -->
<p>{{ longText | truncate:20:'...' }}</p>
```

---

## Routing

### Setting Up Routing

```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'user/:id', component: UserComponent },
  { path: '**', component: NotFoundComponent }  // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### Router Outlet

```html
<!-- app.component.html -->
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/about">About</a>
  <a routerLink="/user/1">User 1</a>
</nav>

<router-outlet></router-outlet>
```

### Navigation

```typescript
// Programmatic navigation
import { Router } from '@angular/router';

export class MyComponent {
  constructor(private router: Router) { }
  
  goToUser(id: number): void {
    this.router.navigate(['/user', id]);
  }
  
  goToAbout(): void {
    this.router.navigateByUrl('/about');
  }
}
```

### Route Parameters

```typescript
// user.component.ts
import { ActivatedRoute } from '@angular/router';

export class UserComponent implements OnInit {
  userId: number;
  
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    // Snapshot (one-time)
    this.userId = +this.route.snapshot.paramMap.get('id');
    
    // Observable (reactive)
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id');
    });
  }
}
```

### Route Guards

```typescript
// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }
}
```

```typescript
// Apply guard to route
const routes: Routes = [
  { 
    path: 'admin', 
    component: AdminComponent,
    canActivate: [AuthGuard]
  }
];
```

### Lazy Loading

```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule)
  }
];
```

---

## Forms

### Template-Driven Forms

```typescript
// app.module.ts
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule]
})
```

```html
<!-- template-driven-form.component.html -->
<form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">
  <div>
    <label>Name:</label>
    <input 
      type="text" 
      name="name" 
      [(ngModel)]="user.name" 
      required
      #name="ngModel">
    <div *ngIf="name.invalid && name.touched">
      Name is required
    </div>
  </div>
  
  <div>
    <label>Email:</label>
    <input 
      type="email" 
      name="email" 
      [(ngModel)]="user.email" 
      required
      email
      #email="ngModel">
    <div *ngIf="email.invalid && email.touched">
      Valid email is required
    </div>
  </div>
  
  <button type="submit" [disabled]="userForm.invalid">
    Submit
  </button>
</form>
```

### Reactive Forms

```typescript
// app.module.ts
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [ReactiveFormsModule]
})
```

```typescript
// reactive-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {
  userForm: FormGroup;
  
  constructor(private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18)]]
    });
  }
  
  onSubmit(): void {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }
  
  get name() {
    return this.userForm.get('name');
  }
  
  get email() {
    return this.userForm.get('email');
  }
}
```

```html
<!-- reactive-form.component.html -->
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <div>
    <label>Name:</label>
    <input type="text" formControlName="name">
    <div *ngIf="name.invalid && name.touched">
      <div *ngIf="name.errors?.['required']">Name is required</div>
      <div *ngIf="name.errors?.['minlength']">Min 3 characters</div>
    </div>
  </div>
  
  <div>
    <label>Email:</label>
    <input type="email" formControlName="email">
    <div *ngIf="email.invalid && email.touched">
      <div *ngIf="email.errors?.['required']">Email is required</div>
      <div *ngIf="email.errors?.['email']">Invalid email</div>
    </div>
  </div>
  
  <button type="submit" [disabled]="userForm.invalid">
    Submit
  </button>
</form>
```

---

## Observables and RxJS

### What are Observables?

**Observables** are lazy collections of multiple values over time.

### Basic Observable

```typescript
import { Observable } from 'rxjs';

// Create observable
const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});

// Subscribe
observable.subscribe({
  next: value => console.log(value),
  error: err => console.error(err),
  complete: () => console.log('Complete')
});
```

### Common RxJS Operators

```typescript
import { of, from, interval } from 'rxjs';
import { map, filter, tap, catchError, switchMap } from 'rxjs/operators';

// map
of(1, 2, 3).pipe(
  map(x => x * 2)
).subscribe(console.log);  // 2, 4, 6

// filter
of(1, 2, 3, 4, 5).pipe(
  filter(x => x % 2 === 0)
).subscribe(console.log);  // 2, 4

// tap (side effects)
of(1, 2, 3).pipe(
  tap(x => console.log('Before:', x)),
  map(x => x * 2),
  tap(x => console.log('After:', x))
).subscribe();

// catchError
this.http.get('/api/data').pipe(
  catchError(error => {
    console.error('Error:', error);
    return of([]);  // Return default value
  })
).subscribe(data => console.log(data));

// switchMap (cancel previous)
this.searchTerm$.pipe(
  switchMap(term => this.searchService.search(term))
).subscribe(results => this.results = results);
```

### HTTP with Observables

```typescript
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class DataService {
  constructor(private http: HttpClient) { }
  
  getData(): Observable<Data[]> {
    return this.http.get<Data[]>('/api/data');
  }
  
  postData(data: Data): Observable<Data> {
    return this.http.post<Data>('/api/data', data);
  }
}
```

---

## Change Detection

### What is Change Detection?

**Change Detection** is the mechanism by which Angular keeps the view in sync with the component state.

### Change Detection Strategies

```typescript
// Default strategy
@Component({
  changeDetection: ChangeDetectionStrategy.Default
})

// OnPush strategy (performance optimization)
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent {
  @Input() data: Data;  // Only checks when @Input changes
}
```

### Manual Change Detection

```typescript
import { ChangeDetectorRef } from '@angular/core';

export class MyComponent {
  constructor(private cdr: ChangeDetectorRef) { }
  
  updateData(): void {
    // Manually trigger change detection
    this.cdr.detectChanges();
    
    // Mark for check
    this.cdr.markForCheck();
    
    // Detach from change detection
    this.cdr.detach();
    
    // Reattach
    this.cdr.reattach();
  }
}
```

---

## Angular CLI

### Common Commands

```bash
# Create new application
ng new my-app

# Serve application
ng serve
ng serve --open  # Open browser
ng serve --port 4300  # Custom port

# Generate components
ng generate component user
ng g c user  # Shorthand

# Generate service
ng generate service user
ng g s user

# Generate module
ng generate module admin
ng g m admin

# Generate directive
ng generate directive highlight
ng g d highlight

# Generate pipe
ng generate pipe reverse
ng g p reverse

# Build for production
ng build --prod

# Run tests
ng test

# Run e2e tests
ng e2e

# Lint code
ng lint
```

---

## Best Practices

### 1. Component Design

```typescript
// ✅ Good: Small, focused components
@Component({
  selector: 'app-user-card',
  template: `
    <div class="card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
    </div>
  `
})
export class UserCardComponent {
  @Input() user: User;
}

// ❌ Bad: Large, monolithic components
```

### 2. Use OnPush Change Detection

```typescript
// ✅ Good: Better performance
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent {
  @Input() data: Data;
}
```

### 3. Unsubscribe from Observables

```typescript
// ✅ Good: Prevent memory leaks
export class MyComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  ngOnInit() {
    this.service.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.data = data);
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### 4. Use Async Pipe

```typescript
// ✅ Good: Auto-unsubscribes
@Component({
  template: `<p>{{ data$ | async }}</p>`
})
export class MyComponent {
  data$ = this.service.getData();
}
```

### 5. Lazy Load Modules

```typescript
// ✅ Good: Improve initial load time
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule)
  }
];
```

---

## Common Interview Questions

### 1. What is Angular?

**Answer:** Angular is a TypeScript-based open-source web application framework developed by Google for building single-page applications (SPAs).

---

### 2. What is the difference between AngularJS and Angular?

**Answer:**
- **AngularJS**: JavaScript-based, MVC architecture, slower
- **Angular**: TypeScript-based, component-based, faster, mobile-friendly

---

### 3. What is a component?

**Answer:** A component is a building block of Angular applications that controls a view. It consists of a TypeScript class, HTML template, and CSS styles.

---

### 4. What is a module?

**Answer:** A module is a container that groups related components, directives, pipes, and services. Every Angular app has at least one module (AppModule).

---

### 5. What is dependency injection?

**Answer:** Dependency Injection (DI) is a design pattern where dependencies are provided to a class rather than the class creating them itself. Angular has a built-in DI system.

---

### 6. What are directives?

**Answer:** Directives are classes that add behavior to elements. Types:
- **Component directives**: Components with templates
- **Structural directives**: Change DOM structure (*ngIf, *ngFor)
- **Attribute directives**: Change appearance (ngClass, ngStyle)

---

### 7. What is data binding?

**Answer:** Data binding is synchronization between component and view. Types:
- Interpolation `{{ }}`
- Property binding `[]`
- Event binding `()`
- Two-way binding `[()]`

---

### 8. What are pipes?

**Answer:** Pipes transform data in templates for display. Examples: date, uppercase, currency, async.

---

### 9. What is the difference between template-driven and reactive forms?

**Answer:**
- **Template-driven**: Uses directives in template, simpler, less control
- **Reactive**: Uses FormBuilder in component, more control, better for complex forms

---

### 10. What are observables?

**Answer:** Observables are lazy collections of multiple values over time, used extensively in Angular for async operations like HTTP requests.

---

### 11. What is RxJS?

**Answer:** RxJS (Reactive Extensions for JavaScript) is a library for reactive programming using observables. Angular uses it for handling async operations.

---

### 12. What is change detection?

**Answer:** Change detection is the mechanism by which Angular keeps the view in sync with component state. Strategies: Default and OnPush.

---

### 13. What are lifecycle hooks?

**Answer:** Lifecycle hooks are methods that Angular calls at specific moments in a component's lifecycle (ngOnInit, ngOnDestroy, etc.).

---

### 14. What is lazy loading?

**Answer:** Lazy loading is loading modules on-demand rather than at application startup, improving initial load time.

---

### 15. What is Angular CLI?

**Answer:** Angular CLI is a command-line interface tool for creating, building, and managing Angular applications.

---

## Quick Reference

### Angular Cheat Sheet

| Concept | Syntax | Example |
|---------|--------|---------|
| Component | `@Component` | `@Component({selector: 'app-user'})` |
| Module | `@NgModule` | `@NgModule({declarations: []})` |
| Service | `@Injectable` | `@Injectable({providedIn: 'root'})` |
| Input | `@Input()` | `@Input() data: string` |
| Output | `@Output()` | `@Output() notify = new EventEmitter()` |
| Interpolation | `{{ }}` | `{{ name }}` |
| Property Binding | `[]` | `[src]="imageUrl"` |
| Event Binding | `()` | `(click)="onClick()"` |
| Two-Way Binding | `[()]` | `[(ngModel)]="name"` |
| Structural Directive | `*` | `*ngIf="condition"` |
| Pipe | `|` | `{{ date | date }}` |

---

**Master Angular! 🅰️**