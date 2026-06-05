# Angular Lifecycle Hooks - Complete Guide

A comprehensive guide covering all Angular lifecycle hooks for interview preparation.

---

## Table of Contents

1. [What are Lifecycle Hooks?](#what-are-lifecycle-hooks)
2. [Lifecycle Sequence](#lifecycle-sequence)
3. [ngOnChanges](#ngonchanges)
4. [ngOnInit](#ngoninit)
5. [ngDoCheck](#ngdocheck)
6. [ngAfterContentInit](#ngaftercontentinit)
7. [ngAfterContentChecked](#ngaftercontentchecked)
8. [ngAfterViewInit](#ngafterviewinit)
9. [ngAfterViewChecked](#ngafterviewchecked)
10. [ngOnDestroy](#ngondestroy)
11. [Comparison and Best Practices](#comparison-and-best-practices)
12. [Common Interview Questions](#common-interview-questions)

---

## What are Lifecycle Hooks?

**Lifecycle hooks** are methods that Angular calls at specific moments in a component's lifecycle, from creation to destruction.

They allow you to tap into key events and perform actions at the right time.

### Why Use Lifecycle Hooks?

✅ **Initialization**: Set up component data
✅ **Change Detection**: Respond to input changes
✅ **DOM Access**: Interact with rendered elements
✅ **Cleanup**: Release resources before destruction
✅ **Performance**: Optimize change detection

---

## Lifecycle Sequence

### Complete Lifecycle Order

```
1. constructor()           ← Component instantiation
2. ngOnChanges()          ← Input properties change
3. ngOnInit()             ← Component initialization
4. ngDoCheck()            ← Change detection
5. ngAfterContentInit()   ← Content projection initialized
6. ngAfterContentChecked()← Content checked
7. ngAfterViewInit()      ← View initialized
8. ngAfterViewChecked()   ← View checked
9. ngOnDestroy()          ← Component destruction
```

### Visual Flow

```
┌─────────────────────────────────────┐
│         Component Created           │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│         ngOnChanges()               │ ← If @Input changes
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│         ngOnInit()                  │ ← Once
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│         ngDoCheck()                 │ ← Every change detection
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│    ngAfterContentInit()             │ ← Once
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│    ngAfterContentChecked()          │ ← Every check
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│    ngAfterViewInit()                │ ← Once
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│    ngAfterViewChecked()             │ ← Every check
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│         ngOnDestroy()               │ ← Before destruction
└─────────────────────────────────────┘
```

---

## ngOnChanges

### Overview

`ngOnChanges()` fires when **@Input bound properties change**.

It receives a `SimpleChanges` object containing current and previous values.

### When It Fires

- ✅ When @Input properties change
- ✅ Before `ngOnInit()`
- ✅ Every time input changes

### Signature

```typescript
ngOnChanges(changes: SimpleChanges): void
```

### Example

```typescript
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <h3>Child Component</h3>
    <p>Name: {{ name }}</p>
    <p>Age: {{ age }}</p>
  `
})
export class ChildComponent implements OnChanges {
  @Input() name: string;
  @Input() age: number;
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called');
    
    // Check if 'name' changed
    if (changes['name']) {
      console.log('Name changed:');
      console.log('Previous:', changes['name'].previousValue);
      console.log('Current:', changes['name'].currentValue);
      console.log('First change:', changes['name'].firstChange);
    }
    
    // Check if 'age' changed
    if (changes['age']) {
      console.log('Age changed:');
      console.log('Previous:', changes['age'].previousValue);
      console.log('Current:', changes['age'].currentValue);
    }
  }
}
```

### Parent Component

```typescript
@Component({
  selector: 'app-parent',
  template: `
    <app-child [name]="userName" [age]="userAge"></app-child>
    <button (click)="changeName()">Change Name</button>
  `
})
export class ParentComponent {
  userName = 'John';
  userAge = 25;
  
  changeName() {
    this.userName = 'Jane';
  }
}
```

### Use Cases

- ✅ React to input property changes
- ✅ Validate input data
- ✅ Transform input values
- ✅ Trigger side effects based on changes

---

## ngOnInit

### Overview

`ngOnInit()` fires **once** after the component's input properties are initialized.

This is the best place for initialization logic.

### When It Fires

- ✅ Once, after first `ngOnChanges()`
- ✅ After @Input properties are set
- ✅ Before view initialization

### Signature

```typescript
ngOnInit(): void
```

### Example

```typescript
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    <h3>{{ user?.name }}</h3>
    <p>{{ user?.email }}</p>
  `
})
export class UserComponent implements OnInit {
  @Input() userId: number;
  user: User;
  
  constructor(private userService: UserService) {
    console.log('Constructor called');
    // ❌ Don't fetch data here
  }
  
  ngOnInit(): void {
    console.log('ngOnInit called');
    
    // ✅ Fetch data here
    this.userService.getUser(this.userId)
      .subscribe(user => this.user = user);
    
    // ✅ Initialize component state
    this.setupComponent();
  }
  
  private setupComponent(): void {
    // Initialization logic
  }
}
```

### Constructor vs ngOnInit

```typescript
export class MyComponent implements OnInit {
  @Input() data: string;
  
  constructor() {
    // ❌ @Input properties not available yet
    console.log(this.data); // undefined
    
    // ✅ Dependency injection
    // ✅ Simple initialization
  }
  
  ngOnInit() {
    // ✅ @Input properties available
    console.log(this.data); // 'some value'
    
    // ✅ API calls
    // ✅ Complex initialization
    // ✅ Subscribe to observables
  }
}
```

### Use Cases

- ✅ Fetch data from API
- ✅ Initialize component state
- ✅ Subscribe to observables
- ✅ Set up complex logic
- ✅ Access @Input properties

---

## ngDoCheck

### Overview

`ngDoCheck()` fires with **every change detection cycle**.

Use it to implement custom change detection logic.

⚠️ **Warning**: Can cause performance issues if not used carefully.

### When It Fires

- ✅ Every change detection cycle
- ✅ After `ngOnChanges()` and `ngOnInit()`
- ✅ Very frequently

### Signature

```typescript
ngDoCheck(): void
```

### Example

```typescript
import { Component, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  template: `
    <ul>
      <li *ngFor="let item of items">{{ item }}</li>
    </ul>
  `
})
export class ListComponent implements DoCheck {
  @Input() items: string[];
  private previousLength: number;
  
  ngDoCheck(): void {
    // Custom change detection for array
    if (this.items && this.items.length !== this.previousLength) {
      console.log('Array length changed:', this.items.length);
      this.previousLength = this.items.length;
      this.onArrayChange();
    }
  }
  
  private onArrayChange(): void {
    // Handle array changes
  }
}
```

### With ChangeDetectorRef

```typescript
import { Component, DoCheck, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-custom-check',
  template: `<p>{{ data }}</p>`
})
export class CustomCheckComponent implements DoCheck {
  data: any;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  ngDoCheck(): void {
    // Manual change detection
    if (this.shouldUpdate()) {
      this.cdr.markForCheck();
    }
  }
  
  private shouldUpdate(): boolean {
    // Custom logic
    return true;
  }
}
```

### Use Cases

- ✅ Detect changes Angular can't detect
- ✅ Custom change detection logic
- ✅ Deep object comparison
- ⚠️ Use sparingly due to performance

---

## ngAfterContentInit

### Overview

`ngAfterContentInit()` fires **once** after Angular projects external content into the component's view.

Used with `@ContentChild` and `@ContentChildren` queries.

### When It Fires

- ✅ Once, after content projection
- ✅ After `ngDoCheck()`
- ✅ Before `ngAfterViewInit()`

### Signature

```typescript
ngAfterContentInit(): void
```

### Example

```typescript
import { Component, ContentChild, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <div class="card-header">
        <ng-content select="[header]"></ng-content>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class CardComponent implements AfterContentInit {
  @ContentChild('headerRef') header: ElementRef;
  
  ngAfterContentInit(): void {
    console.log('Content initialized');
    
    // ✅ Access projected content
    if (this.header) {
      console.log('Header element:', this.header.nativeElement);
    }
  }
}
```

### Usage

```html
<!-- Parent component -->
<app-card>
  <h2 header #headerRef>Card Title</h2>
  <p>Card content goes here</p>
</app-card>
```

### Use Cases

- ✅ Access projected content
- ✅ Query `@ContentChild` elements
- ✅ Initialize after content projection

---

## ngAfterContentChecked

### Overview

`ngAfterContentChecked()` fires after **every change detection cycle** that checks the projected content.

⚠️ **Warning**: Fires frequently, use with caution.

### When It Fires

- ✅ After every content check
- ✅ After `ngAfterContentInit()`
- ✅ Very frequently

### Signature

```typescript
ngAfterContentChecked(): void
```

### Example

```typescript
import { Component, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  template: `
    <div class="wrapper">
      <ng-content></ng-content>
    </div>
  `
})
export class WrapperComponent implements AfterContentChecked {
  private checkCount = 0;
  
  ngAfterContentChecked(): void {
    this.checkCount++;
    console.log('Content checked:', this.checkCount);
    
    // ⚠️ Be careful with operations here
    // This runs very frequently
  }
}
```

### Use Cases

- ✅ React to content changes
- ✅ Update based on projected content
- ⚠️ Use sparingly due to performance

---

## ngAfterViewInit

### Overview

`ngAfterViewInit()` fires **once** after Angular initializes the component's view and child views.

Used with `@ViewChild` and `@ViewChildren` queries.

### When It Fires

- ✅ Once, after view initialization
- ✅ After `ngAfterContentChecked()`
- ✅ After all child views are initialized

### Signature

```typescript
ngAfterViewInit(): void
```

### Example

```typescript
import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <input #inputRef type="text">
    <app-child #childRef></app-child>
  `
})
export class ParentComponent implements AfterViewInit {
  @ViewChild('inputRef') input: ElementRef;
  @ViewChild('childRef') child: ChildComponent;
  
  ngAfterViewInit(): void {
    console.log('View initialized');
    
    // ✅ Access view elements
    this.input.nativeElement.focus();
    
    // ✅ Access child component
    console.log('Child data:', this.child.data);
    
    // ✅ Manipulate DOM
    this.setupView();
  }
  
  private setupView(): void {
    // View manipulation logic
  }
}
```

### Common Use Case: Focus Input

```typescript
@Component({
  selector: 'app-form',
  template: `<input #nameInput type="text">`
})
export class FormComponent implements AfterViewInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  
  ngAfterViewInit(): void {
    // ✅ Focus input after view init
    this.nameInput.nativeElement.focus();
  }
}
```

### Use Cases

- ✅ Access view elements
- ✅ Query `@ViewChild` elements
- ✅ Manipulate DOM
- ✅ Initialize third-party libraries
- ✅ Access child components

---

## ngAfterViewChecked

### Overview

`ngAfterViewChecked()` fires after **every change detection cycle** that checks the component's view.

⚠️ **Warning**: Fires very frequently, use with caution.

### When It Fires

- ✅ After every view check
- ✅ After `ngAfterViewInit()`
- ✅ Very frequently

### Signature

```typescript
ngAfterViewChecked(): void
```

### Example

```typescript
import { Component, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-monitor',
  template: `
    <div>
      <p>{{ message }}</p>
      <button (click)="updateMessage()">Update</button>
    </div>
  `
})
export class MonitorComponent implements AfterViewChecked {
  message = 'Hello';
  private checkCount = 0;
  
  ngAfterViewChecked(): void {
    this.checkCount++;
    console.log('View checked:', this.checkCount);
    
    // ⚠️ Don't modify component state here
    // Can cause "Expression changed after checked" error
  }
  
  updateMessage(): void {
    this.message = 'Updated';
  }
}
```

### Use Cases

- ✅ React to view changes
- ✅ Monitor view state
- ⚠️ Use sparingly due to performance
- ⚠️ Don't modify component state

---

## ngOnDestroy

### Overview

`ngOnDestroy()` fires **once** before Angular destroys the component.

This is the place to clean up resources and prevent memory leaks.

### When It Fires

- ✅ Once, before component destruction
- ✅ When navigating away
- ✅ When component is removed from DOM

### Signature

```typescript
ngOnDestroy(): void
```

### Example

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data',
  template: `<p>{{ data }}</p>`
})
export class DataComponent implements OnInit, OnDestroy {
  data: any;
  private subscription: Subscription;
  private intervalId: any;
  
  constructor(private dataService: DataService) {}
  
  ngOnInit(): void {
    // Subscribe to observable
    this.subscription = this.dataService.getData()
      .subscribe(data => this.data = data);
    
    // Set up interval
    this.intervalId = setInterval(() => {
      console.log('Polling...');
    }, 1000);
  }
  
  ngOnDestroy(): void {
    console.log('Component destroyed');
    
    // ✅ Unsubscribe from observables
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    
    // ✅ Clear intervals
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    
    // ✅ Remove event listeners
    // ✅ Cancel pending requests
    // ✅ Release resources
  }
}
```

### Multiple Subscriptions

```typescript
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-multi-sub',
  template: `<p>Data</p>`
})
export class MultiSubComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    // All subscriptions will auto-unsubscribe
    this.service1.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.data1 = data);
    
    this.service2.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.data2 = data);
  }
  
  ngOnDestroy(): void {
    // ✅ Unsubscribe all at once
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Use Cases

- ✅ Unsubscribe from observables
- ✅ Clear timers and intervals
- ✅ Remove event listeners
- ✅ Cancel HTTP requests
- ✅ Clean up resources
- ✅ Save state before destruction

---

## Comparison and Best Practices

### Lifecycle Hooks Comparison

| Hook | Fires | Frequency | Use Case |
|------|-------|-----------|----------|
| `ngOnChanges` | Input changes | Multiple | React to @Input changes |
| `ngOnInit` | Initialization | Once | Initialize component |
| `ngDoCheck` | Change detection | Many | Custom change detection |
| `ngAfterContentInit` | Content ready | Once | Access projected content |
| `ngAfterContentChecked` | Content checked | Many | Monitor content changes |
| `ngAfterViewInit` | View ready | Once | Access view elements |
| `ngAfterViewChecked` | View checked | Many | Monitor view changes |
| `ngOnDestroy` | Before destroy | Once | Cleanup resources |

### Best Practices

#### 1. Use ngOnInit for Initialization

```typescript
// ✅ Good
ngOnInit(): void {
  this.fetchData();
  this.setupComponent();
}

// ❌ Bad
constructor() {
  this.fetchData(); // @Input not available
}
```

#### 2. Always Clean Up in ngOnDestroy

```typescript
// ✅ Good
ngOnDestroy(): void {
  this.subscription.unsubscribe();
  clearInterval(this.intervalId);
}

// ❌ Bad
ngOnDestroy(): void {
  // No cleanup - memory leak!
}
```

#### 3. Be Careful with Frequent Hooks

```typescript
// ⚠️ Use sparingly
ngDoCheck(): void {
  // Runs very frequently
  // Can impact performance
}

ngAfterViewChecked(): void {
  // Runs very frequently
  // Don't modify state here
}
```

#### 4. Use Async Pipe to Auto-Unsubscribe

```typescript
// ✅ Good: Auto-unsubscribes
@Component({
  template: `<p>{{ data$ | async }}</p>`
})
export class MyComponent {
  data$ = this.service.getData();
}

// ❌ Manual subscription
export class MyComponent implements OnInit, OnDestroy {
  ngOnInit() {
    this.subscription = this.service.getData()
      .subscribe(data => this.data = data);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

---

## Common Interview Questions

### 1. What are lifecycle hooks in Angular?

**Answer:** Lifecycle hooks are methods that Angular calls at specific moments in a component's lifecycle, from creation to destruction. They allow you to tap into key events and perform actions at the right time.

---

### 2. What is the order of lifecycle hooks?

**Answer:**
1. ngOnChanges
2. ngOnInit
3. ngDoCheck
4. ngAfterContentInit
5. ngAfterContentChecked
6. ngAfterViewInit
7. ngAfterViewChecked
8. ngOnDestroy

---

### 3. What is the difference between constructor and ngOnInit?

**Answer:**
- **Constructor**: TypeScript class initialization, @Input not available, dependency injection
- **ngOnInit**: Angular initialization, @Input available, best place for initialization logic

---

### 4. When does ngOnChanges fire?

**Answer:** `ngOnChanges` fires when @Input bound properties change. It receives a `SimpleChanges` object with current and previous values.

---

### 5. What is ngOnDestroy used for?

**Answer:** `ngOnDestroy` is used for cleanup before component destruction:
- Unsubscribe from observables
- Clear timers/intervals
- Remove event listeners
- Release resources

---

### 6. What is the difference between ngAfterContentInit and ngAfterViewInit?

**Answer:**
- **ngAfterContentInit**: Fires after content projection (`<ng-content>`) is initialized
- **ngAfterViewInit**: Fires after component's view and child views are initialized

---

### 7. When should you use ngDoCheck?

**Answer:** Use `ngDoCheck` for custom change detection logic that Angular can't detect automatically, like deep object changes. Use sparingly due to performance impact.

---

### 8. Why is ngOnDestroy important?

**Answer:** To prevent memory leaks by cleaning up subscriptions, timers, and event listeners before component destruction.

---

### 9. Can you modify component state in ngAfterViewChecked?

**Answer:** No, modifying state in `ngAfterViewChecked` can cause "Expression changed after checked" error. It runs after change detection.

---

### 10. What is the difference between @ViewChild and @ContentChild?

**Answer:**
- **@ViewChild**: Queries elements in component's own template
- **@ContentChild**: Queries elements projected via `<ng-content>`

---

## Quick Reference

### Lifecycle Hooks Cheat Sheet

```typescript
export class MyComponent implements 
  OnChanges, OnInit, DoCheck,
  AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked,
  OnDestroy {
  
  ngOnChanges(changes: SimpleChanges) {
    // Input changes
  }
  
  ngOnInit() {
    // Initialize (once)
  }
  
  ngDoCheck() {
    // Custom change detection
  }
  
  ngAfterContentInit() {
    // Content ready (once)
  }
  
  ngAfterContentChecked() {
    // Content checked
  }
  
  ngAfterViewInit() {
    // View ready (once)
  }
  
  ngAfterViewChecked() {
    // View checked
  }
  
  ngOnDestroy() {
    // Cleanup
  }
}
```

---

**Master Angular Lifecycle Hooks! 🅰️**