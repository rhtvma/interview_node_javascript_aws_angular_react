# Angular Data Sharing Between Components

A comprehensive guide covering all methods to share data between Angular components for interview preparation.

---

## Table of Contents

1. [Overview](#overview)
2. [Parent to Child: @Input](#parent-to-child-input)
3. [Child to Parent: @Output and EventEmitter](#child-to-parent-output-and-eventemitter)
4. [Child to Parent: ViewChild](#child-to-parent-viewchild)
5. [Unrelated Components: Service](#unrelated-components-service)
6. [Comparison](#comparison)
7. [Best Practices](#best-practices)
8. [Common Interview Questions](#common-interview-questions)

---

## Overview

There are **four main methods** to share data between Angular components:

1. **Parent-to-Child**: Using `@Input()` decorator
2. **Child-to-Parent**: Using `@Output()` and `EventEmitter`
3. **Child-to-Parent**: Using `@ViewChild` decorator
4. **Unrelated Components**: Using a shared Service

### Component Communication Patterns

```
┌─────────────────────────────────────┐
│         Parent Component            │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  @Input() ──→ Child          │  │
│  │  @Output() ←── Child         │  │
│  │  @ViewChild ←── Child        │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘

┌─────────────┐      Service      ┌─────────────┐
│ Component A │ ←──────────────→  │ Component B │
└─────────────┘                   └─────────────┘
```

---

## Parent to Child: @Input

### Overview

`@Input()` decorator allows passing data from a **parent component** to its **child component**.

The child component receives data through a property decorated with `@Input()`.

### How It Works

```
Parent Component
    │
    │ [childProperty]="parentData"
    ▼
Child Component
    @Input() childProperty
```

### Example

#### Parent Component

```typescript
// parent.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <div class="parent">
      <h2>Parent Component</h2>
      <p>Message from parent: {{ parentMessage }}</p>
      
      <!-- Pass data to child -->
      <app-child [childMessage]="parentMessage"></app-child>
    </div>
  `,
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  parentMessage = "Hello message from parent!";
  
  constructor() { }
}
```

#### Child Component

```typescript
// child.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <div class="child">
      <h3>Child Component</h3>
      <p>Received: {{ childMessage }}</p>
    </div>
  `,
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  // Receive data from parent
  @Input() childMessage: string;
  
  constructor() { }
}
```

### Multiple Inputs

```typescript
// child.component.ts
export class ChildComponent {
  @Input() title: string;
  @Input() count: number;
  @Input() user: User;
  @Input() items: string[];
}
```

```html
<!-- parent.component.html -->
<app-child 
  [title]="pageTitle"
  [count]="itemCount"
  [user]="currentUser"
  [items]="itemList">
</app-child>
```

### Input with Alias

```typescript
// child.component.ts
export class ChildComponent {
  @Input('userName') name: string;
}
```

```html
<!-- parent.component.html -->
<app-child [userName]="user.name"></app-child>
```

### Input with Setter

```typescript
// child.component.ts
export class ChildComponent {
  private _message: string;
  
  @Input()
  set message(value: string) {
    this._message = value?.trim() || 'Default message';
    console.log('Message received:', this._message);
  }
  
  get message(): string {
    return this._message;
  }
}
```

---

## Child to Parent: @Output and EventEmitter

### Overview

`@Output()` decorator with `EventEmitter` allows passing data from a **child component** to its **parent component**.

The child emits events that the parent listens to.

### How It Works

```
Child Component
    @Output() event = new EventEmitter()
    event.emit(data)
    │
    │ (event)="handler($event)"
    ▼
Parent Component
    handler(data) { ... }
```

### Example

#### Parent Component

```typescript
// parent.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <div class="parent">
      <h2>Parent Component</h2>
      <p>Message from child: {{ message }}</p>
      
      <!-- Listen to child event -->
      <app-child (messageEvent)="receiveMessage($event)"></app-child>
    </div>
  `,
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  message: string;
  
  constructor() { }
  
  receiveMessage($event: string) {
    this.message = $event;
    console.log('Received from child:', $event);
  }
}
```

#### Child Component

```typescript
// child.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <div class="child">
      <h3>Child Component</h3>
      <button (click)="sendMessage()">Send Message</button>
    </div>
  `,
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  message: string = "Hola Mundo!";
  
  // Create event emitter
  @Output() messageEvent = new EventEmitter<string>();
  
  constructor() { }
  
  sendMessage() {
    // Emit event with data
    this.messageEvent.emit(this.message);
  }
}
```

### Multiple Outputs

```typescript
// child.component.ts
export class ChildComponent {
  @Output() save = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<number>();
  
  onSave() {
    this.save.emit(this.user);
  }
  
  onCancel() {
    this.cancel.emit();
  }
  
  onDelete(id: number) {
    this.delete.emit(id);
  }
}
```

```html
<!-- parent.component.html -->
<app-child 
  (save)="handleSave($event)"
  (cancel)="handleCancel()"
  (delete)="handleDelete($event)">
</app-child>
```

### Output with Alias

```typescript
// child.component.ts
export class ChildComponent {
  @Output('onSubmit') submitEvent = new EventEmitter<any>();
}
```

```html
<!-- parent.component.html -->
<app-child (onSubmit)="handleSubmit($event)"></app-child>
```

---

## Child to Parent: ViewChild

### Overview

`@ViewChild` allows a parent component to access a child component's properties and methods directly.

The child component is injected into the parent, giving full access to its public members.

### How It Works

```
Parent Component
    @ViewChild(ChildComponent) child
    ngAfterViewInit() {
        this.data = this.child.property
    }
    │
    ▼
Child Component
    public property
    public method()
```

### Important Note

⚠️ The child won't be available until **after the view has been initialized**.

Therefore, use the `AfterViewInit` lifecycle hook to access child data.

### Example

#### Parent Component

```typescript
// parent.component.ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ChildComponent } from "../child/child.component";

@Component({
  selector: 'app-parent',
  template: `
    <div class="parent">
      <h2>Parent Component</h2>
      <p>Message from child: {{ message }}</p>
      <button (click)="callChildMethod()">Call Child Method</button>
      
      <app-child></app-child>
    </div>
  `,
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements AfterViewInit {
  // Get reference to child component
  @ViewChild(ChildComponent) child: ChildComponent;
  
  message: string;
  
  constructor() { }
  
  ngAfterViewInit() {
    // Access child property after view init
    this.message = this.child.message;
    console.log('Child message:', this.message);
  }
  
  callChildMethod() {
    // Call child method
    this.child.doSomething();
  }
}
```

#### Child Component

```typescript
// child.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <div class="child">
      <h3>Child Component</h3>
      <p>{{ message }}</p>
    </div>
  `,
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  message = 'Hola Mundo!';
  
  constructor() { }
  
  doSomething() {
    console.log('Child method called from parent!');
    alert('Hello from child!');
  }
}
```

### ViewChild with Template Reference

```typescript
// parent.component.ts
@Component({
  template: `
    <app-child #childRef></app-child>
    <button (click)="childRef.doSomething()">Call Child</button>
  `
})
export class ParentComponent implements AfterViewInit {
  @ViewChild('childRef') child: ChildComponent;
  
  ngAfterViewInit() {
    console.log(this.child.message);
  }
}
```

### ViewChild with Multiple Children

```typescript
// parent.component.ts
import { QueryList, ViewChildren } from '@angular/core';

export class ParentComponent implements AfterViewInit {
  @ViewChildren(ChildComponent) children: QueryList<ChildComponent>;
  
  ngAfterViewInit() {
    this.children.forEach(child => {
      console.log(child.message);
    });
  }
}
```

---

## Unrelated Components: Service

### Overview

A **shared service** acts as a central point for data manipulation and communication between unrelated components.

Components can share data by injecting and accessing the service.

### How It Works

```
Component A ──→ Service ──→ Component B
           ←──         ←──
```

### Example

#### Shared Service

```typescript
// data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Private BehaviorSubject
  private messageSource = new BehaviorSubject<string>('default message');
  
  // Public Observable
  currentMessage: Observable<string> = this.messageSource.asObservable();
  
  constructor() { }
  
  // Method to update message
  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
```

#### Parent Component

```typescript
// parent.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-parent',
  template: `
    <div class="parent">
      <h2>Parent Component</h2>
      <p>Current message: {{ message }}</p>
      <button (click)="newMessage()">New Message</button>
    </div>
  `,
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit, OnDestroy {
  message: string;
  subscription: Subscription;
  
  constructor(private data: DataService) { }
  
  ngOnInit() {
    // Subscribe to message changes
    this.subscription = this.data.currentMessage
      .subscribe(message => this.message = message);
  }
  
  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }
  
  newMessage() {
    this.data.changeMessage("Hello from Parent");
  }
}
```

#### Sibling Component

```typescript
// sibling.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from "../data.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sibling',
  template: `
    <div class="sibling">
      <h2>Sibling Component</h2>
      <p>Current message: {{ message }}</p>
      <button (click)="newMessage()">New Message</button>
    </div>
  `,
  styleUrls: ['./sibling.component.css']
})
export class SiblingComponent implements OnInit, OnDestroy {
  message: string;
  subscription: Subscription;
  
  constructor(private data: DataService) { }
  
  ngOnInit() {
    // Subscribe to message changes
    this.subscription = this.data.currentMessage
      .subscribe(message => this.message = message);
  }
  
  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }
  
  newMessage() {
    this.data.changeMessage("Hello from Sibling");
  }
}
```

### Service with Subject

```typescript
// data.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new Subject<any>();
  
  data$ = this.dataSubject.asObservable();
  
  sendData(data: any) {
    this.dataSubject.next(data);
  }
}
```

### Service with State Management

```typescript
// state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface AppState {
  user: User;
  isLoggedIn: boolean;
  theme: string;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private state = new BehaviorSubject<AppState>({
    user: null,
    isLoggedIn: false,
    theme: 'light'
  });
  
  state$ = this.state.asObservable();
  
  updateState(newState: Partial<AppState>) {
    this.state.next({
      ...this.state.value,
      ...newState
    });
  }
  
  getState(): AppState {
    return this.state.value;
  }
}
```

---

## Comparison

### When to Use Each Method

| Method | Use Case | Direction | Relationship |
|--------|----------|-----------|--------------|
| **@Input** | Pass data down | Parent → Child | Direct parent-child |
| **@Output** | Send events up | Child → Parent | Direct parent-child |
| **@ViewChild** | Access child directly | Parent ← Child | Direct parent-child |
| **Service** | Share across app | Any ↔ Any | Any components |

### Pros and Cons

#### @Input
✅ **Pros:**
- Simple and straightforward
- Type-safe
- Easy to understand

❌ **Cons:**
- Only parent to child
- Requires direct relationship

#### @Output
✅ **Pros:**
- Decoupled communication
- Event-driven
- Type-safe

❌ **Cons:**
- Only child to parent
- Can become complex with many events

#### @ViewChild
✅ **Pros:**
- Direct access to child
- Can call methods
- Access all public members

❌ **Cons:**
- Tight coupling
- Only available after view init
- Not recommended for data passing

#### Service
✅ **Pros:**
- Works with any components
- Centralized data management
- Scalable

❌ **Cons:**
- More complex setup
- Need to manage subscriptions
- Can lead to memory leaks if not careful

---

## Best Practices

### 1. Choose the Right Method

```typescript
// ✅ Good: Use @Input for parent-to-child
<app-child [data]="parentData"></app-child>

// ✅ Good: Use @Output for child-to-parent events
<app-child (save)="handleSave($event)"></app-child>

// ✅ Good: Use Service for unrelated components
// Component A and Component B both inject DataService

// ❌ Bad: Using Service for simple parent-child
// Unnecessary complexity
```

### 2. Always Unsubscribe

```typescript
// ✅ Good: Unsubscribe in ngOnDestroy
export class MyComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  
  ngOnInit() {
    this.subscription = this.service.data$
      .subscribe(data => this.data = data);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

// ✅ Better: Use async pipe (auto-unsubscribes)
@Component({
  template: `<p>{{ data$ | async }}</p>`
})
export class MyComponent {
  data$ = this.service.data$;
}
```

### 3. Use Type Safety

```typescript
// ✅ Good: Strongly typed
@Input() user: User;
@Output() save = new EventEmitter<User>();

// ❌ Bad: Any type
@Input() data: any;
@Output() event = new EventEmitter<any>();
```

### 4. Validate Input Data

```typescript
// ✅ Good: Validate and provide defaults
export class ChildComponent {
  private _count: number;
  
  @Input()
  set count(value: number) {
    this._count = value > 0 ? value : 0;
  }
  
  get count(): number {
    return this._count;
  }
}
```

### 5. Use OnPush Change Detection with Services

```typescript
// ✅ Good: Optimize performance
@Component({
  selector: 'app-my-component',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent {
  data$ = this.service.data$;
}
```

---

## Common Interview Questions

### 1. What are the ways to share data between components in Angular?

**Answer:** Four main methods:
1. `@Input()` - Parent to child
2. `@Output()` and `EventEmitter` - Child to parent
3. `@ViewChild` - Parent accessing child
4. Service - Any components

---

### 2. What is @Input decorator?

**Answer:** `@Input()` decorator allows a parent component to pass data to a child component through property binding.

---

### 3. What is @Output decorator?

**Answer:** `@Output()` decorator with `EventEmitter` allows a child component to emit events to its parent component.

---

### 4. What is the difference between @Input and @Output?

**Answer:**
- `@Input`: Parent → Child (data flow down)
- `@Output`: Child → Parent (events flow up)

---

### 5. What is @ViewChild?

**Answer:** `@ViewChild` allows a parent component to access a child component's properties and methods directly. Available after `ngAfterViewInit`.

---

### 6. When should you use a service for data sharing?

**Answer:** Use a service when:
- Components are not directly related
- Need to share data across multiple components
- Need centralized state management
- Components are in different parts of the app

---

### 7. What is BehaviorSubject?

**Answer:** `BehaviorSubject` is a type of Subject that:
- Requires an initial value
- Emits current value to new subscribers
- Stores the last emitted value

---

### 8. Why unsubscribe from observables?

**Answer:** To prevent memory leaks. Subscriptions keep references to components, preventing garbage collection.

---

### 9. What is the difference between Subject and BehaviorSubject?

**Answer:**
- **Subject**: No initial value, new subscribers don't get previous values
- **BehaviorSubject**: Has initial value, new subscribers get current value

---

### 10. Can you use @ViewChild before ngAfterViewInit?

**Answer:** No, the child component is not available until after the view has been initialized. Always use `ngAfterViewInit` lifecycle hook.

---

## Quick Reference

### Data Sharing Methods

| Method | Decorator | Direction | Use Case |
|--------|-----------|-----------|----------|
| Input | `@Input()` | Parent → Child | Pass data down |
| Output | `@Output()` | Child → Parent | Emit events up |
| ViewChild | `@ViewChild()` | Parent ← Child | Access child |
| Service | Injectable | Any ↔ Any | Share globally |

---

**Master Angular Component Communication! 🅰️**