# Angular Data Binding - Complete Guide

A comprehensive guide covering Angular data binding concepts for interview preparation.

---

## Table of Contents

1. [What is Data Binding?](#what-is-data-binding)
2. [One-Way Data Binding](#one-way-data-binding)
3. [Two-Way Data Binding](#two-way-data-binding)
4. [Comparison](#comparison)
5. [Best Practices](#best-practices)
6. [Common Interview Questions](#common-interview-questions)

---

## What is Data Binding?

**Data Binding** is a mechanism in Angular that allows communication between the component (TypeScript code) and the template (HTML view).

Angular supports both **One-Way** and **Two-Way** data binding.

### Types of Data Binding

```
Component ←→ Template

1. One-Way Binding
   - Interpolation: Component → Template
   - Property Binding: Component → Template
   - Event Binding: Template → Component

2. Two-Way Binding
   - Component ↔ Template (both directions)
```

---

## One-Way Data Binding

In one-way binding, data flows in a **single direction**, either from the component to the view or from the view to the component.

### 1. Interpolation

Displays component data in the view by enclosing the property or expression in double curly braces `{{ }}`.

Angular automatically updates the view whenever the underlying data changes.

#### Syntax

```typescript
// Component
export class AppComponent {
  title = 'My Angular App';
  userName = 'John Doe';
}
```

```html
<!-- Template -->
<h1>{{ title }}</h1>
<p>Welcome, {{ userName }}!</p>

<!-- Using in attributes -->
<div class="{{ className }}">Content</div>
```

#### Examples

```html
<!-- Simple property -->
<h2>{{ message }}</h2>

<!-- Expression -->
<p>{{ 2 + 2 }}</p>

<!-- Method call -->
<p>{{ getUserName() }}</p>

<!-- Conditional -->
<p>{{ isLoggedIn ? 'Welcome' : 'Please login' }}</p>
```

---

### 2. Property Binding

Binds a property of an HTML element to a component property using **square brackets** `[]`.

Data flows from **component to template**.

#### Syntax

```typescript
// Component
export class AppComponent {
  imageUrl = 'assets/logo.png';
  isDisabled = false;
  className = 'highlight';
}
```

```html
<!-- Template -->
<img [src]="imageUrl" alt="Logo">
<button [disabled]="isDisabled">Click Me</button>
<div [class]="className">Styled Content</div>
```

#### Examples

```html
<!-- Bind to src attribute -->
<img [src]="imageUrl">

<!-- Bind to disabled property -->
<button [disabled]="isButtonDisabled">Submit</button>

<!-- Bind to class -->
<div [class]="dynamicClass">Content</div>

<!-- Bind to style -->
<p [style.color]="textColor">Colored Text</p>

<!-- Bind to innerHTML -->
<div [innerHTML]="htmlContent"></div>

<!-- Bind to custom property -->
<app-child [childProperty]="parentData"></app-child>
```

#### Property Binding vs Interpolation

```html
<!-- Both work the same for simple cases -->
<img src="{{ imageUrl }}">
<img [src]="imageUrl">

<!-- Property binding is preferred -->
<button [disabled]="isDisabled">Click</button>

<!-- Interpolation doesn't work here -->
<button disabled="{{ isDisabled }}">Click</button> ❌
```

---

### 3. Event Binding

Allows the view to communicate changes back to the component when an event occurs.

Event binding is denoted by **parentheses** `()`.

Data flows from **template to component**.

#### Syntax

```typescript
// Component
export class AppComponent {
  showEvent(event: Event) {
    alert('Welcome to Angular!');
    console.log(event);
  }
  
  handleClick() {
    console.log('Button clicked!');
  }
}
```

```html
<!-- Template -->
<button (click)="handleClick()">Click Me</button>
<button (click)="showEvent($event)">Show Event</button>
```

#### Common Events

```html
<!-- Click event -->
<button (click)="onClick()">Click</button>

<!-- Input event -->
<input (input)="onInput($event)">

<!-- Change event -->
<select (change)="onChange($event)">
  <option>Option 1</option>
</select>

<!-- Focus events -->
<input (focus)="onFocus()" (blur)="onBlur()">

<!-- Mouse events -->
<div (mouseenter)="onMouseEnter()" 
     (mouseleave)="onMouseLeave()">
  Hover me
</div>

<!-- Keyboard events -->
<input (keyup)="onKeyUp($event)" 
       (keydown)="onKeyDown($event)">

<!-- Form events -->
<form (submit)="onSubmit($event)">
  <button type="submit">Submit</button>
</form>
```

#### Event Object

```typescript
// Component
export class AppComponent {
  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Input value:', target.value);
  }
  
  onKeyPress(event: KeyboardEvent) {
    console.log('Key pressed:', event.key);
  }
  
  onClick(event: MouseEvent) {
    console.log('Click coordinates:', event.clientX, event.clientY);
  }
}
```

```html
<!-- Template -->
<input (input)="onInput($event)">
<input (keypress)="onKeyPress($event)">
<button (click)="onClick($event)">Click</button>
```

---

## Two-Way Data Binding

Two-way binding is a combination of **property binding** and **event binding**.

It simplifies synchronization between the component and the view using the **`[(ngModel)]`** directive.

Data flows in **both directions**: Component ↔ Template

### Syntax

```typescript
// Component
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  userName = '';
  email = '';
}
```

```html
<!-- Template -->
<input type="text" [(ngModel)]="userName">
<p>Hello, {{ userName }}!</p>

<input type="email" [(ngModel)]="email">
<p>Your email: {{ email }}</p>
```

### How It Works

```
[(ngModel)] = [ngModel] + (ngModelChange)

Component ←→ Template
```

**Equivalent to:**

```html
<!-- Two-way binding -->
<input [(ngModel)]="userName">

<!-- Same as -->
<input [ngModel]="userName" 
       (ngModelChange)="userName = $event">
```

### Setup Required

To use `[(ngModel)]`, import `FormsModule`:

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule  // ← Add this
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Complete Example

```typescript
// Component
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align: center">
      <h1 style="color: green">Angular Two-Way Binding</h1>
      
      <input type="text" 
             placeholder="Enter text" 
             [(ngModel)]="val" />
      <br><br>
      
      <p>You typed: <strong>{{ val }}</strong></p>
    </div>
  `
})
export class AppComponent {
  val: string = '';
}
```

### Two-Way Binding with Forms

```typescript
// Component
export class FormComponent {
  user = {
    name: '',
    email: '',
    age: null
  };
  
  onSubmit() {
    console.log('Form submitted:', this.user);
  }
}
```

```html
<!-- Template -->
<form (submit)="onSubmit()">
  <div>
    <label>Name:</label>
    <input type="text" [(ngModel)]="user.name" name="name">
  </div>
  
  <div>
    <label>Email:</label>
    <input type="email" [(ngModel)]="user.email" name="email">
  </div>
  
  <div>
    <label>Age:</label>
    <input type="number" [(ngModel)]="user.age" name="age">
  </div>
  
  <button type="submit">Submit</button>
</form>

<pre>{{ user | json }}</pre>
```

---

## Comparison

### One-Way vs Two-Way Binding

| Feature | One-Way Binding | Two-Way Binding |
|---------|----------------|-----------------|
| **Direction** | Single direction | Both directions |
| **Syntax** | `{{ }}`, `[]`, `()` | `[()]` |
| **Use Case** | Display data, handle events | Form inputs |
| **Performance** | Better | Slightly slower |
| **Complexity** | Simple | More complex |
| **Example** | `[value]="name"` | `[(ngModel)]="name"` |

### When to Use Each

#### Use One-Way Binding When:
- ✅ Displaying read-only data
- ✅ Handling user events
- ✅ Performance is critical
- ✅ Data flows in one direction

#### Use Two-Way Binding When:
- ✅ Working with form inputs
- ✅ Need immediate synchronization
- ✅ User input affects component state
- ✅ Building interactive forms

---

## Best Practices

### 1. Choose the Right Binding Type

```html
<!-- ✅ Good: Use interpolation for simple display -->
<h1>{{ title }}</h1>

<!-- ❌ Bad: Unnecessary property binding -->
<h1 [textContent]="title"></h1>

<!-- ✅ Good: Use property binding for attributes -->
<img [src]="imageUrl">

<!-- ❌ Bad: Interpolation in attributes -->
<img src="{{ imageUrl }}">
```

### 2. Avoid Complex Expressions

```html
<!-- ❌ Bad: Complex logic in template -->
<p>{{ user.firstName + ' ' + user.lastName + ' (' + user.age + ')' }}</p>

<!-- ✅ Good: Use component method -->
<p>{{ getFullUserInfo() }}</p>
```

```typescript
// Component
getFullUserInfo(): string {
  return `${this.user.firstName} ${this.user.lastName} (${this.user.age})`;
}
```

### 3. Use Two-Way Binding Sparingly

```html
<!-- ✅ Good: For form inputs -->
<input [(ngModel)]="userName">

<!-- ❌ Bad: For everything -->
<div [(ngModel)]="content"></div>  <!-- Not needed -->
```

### 4. Prevent Memory Leaks

```typescript
// Component
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class AppComponent implements OnDestroy {
  private subscription: Subscription;
  
  ngOnInit() {
    this.subscription = this.dataService.getData()
      .subscribe(data => this.data = data);
  }
  
  ngOnDestroy() {
    // ✅ Always unsubscribe
    this.subscription.unsubscribe();
  }
}
```

### 5. Use Safe Navigation Operator

```html
<!-- ❌ Bad: Can cause errors if user is null -->
<p>{{ user.name }}</p>

<!-- ✅ Good: Safe navigation -->
<p>{{ user?.name }}</p>

<!-- ✅ Good: With default value -->
<p>{{ user?.name || 'Guest' }}</p>
```

---

## Common Interview Questions

### 1. What is data binding in Angular?

**Answer:** Data binding is a mechanism that allows communication between the component and the template. Angular supports one-way binding (interpolation, property binding, event binding) and two-way binding (ngModel).

---

### 2. What are the types of data binding in Angular?

**Answer:**
1. **Interpolation** `{{ }}` - Component to Template
2. **Property Binding** `[]` - Component to Template
3. **Event Binding** `()` - Template to Component
4. **Two-Way Binding** `[()]` - Both directions

---

### 3. What is the difference between interpolation and property binding?

**Answer:**
- **Interpolation** `{{ }}`: Converts value to string, used for text content
- **Property Binding** `[]`: Binds to element property, works with any type

```html
<!-- Both work for simple cases -->
<p>{{ message }}</p>
<p [textContent]="message"></p>

<!-- Property binding required for non-string -->
<button [disabled]="isDisabled"></button>
```

---

### 4. What is two-way data binding?

**Answer:** Two-way binding synchronizes data between component and template in both directions using `[(ngModel)]`. Changes in the view update the component and vice versa.

---

### 5. How does [(ngModel)] work?

**Answer:** `[(ngModel)]` is syntactic sugar for property binding `[ngModel]` and event binding `(ngModelChange)`:

```html
[(ngModel)]="value"
<!-- Equivalent to -->
[ngModel]="value" (ngModelChange)="value = $event"
```

---

### 6. What is the difference between one-way and two-way binding?

**Answer:**
- **One-way**: Data flows in single direction (component → template or template → component)
- **Two-way**: Data flows in both directions simultaneously (component ↔ template)

---

### 7. When should you use two-way binding?

**Answer:** Use two-way binding for:
- Form inputs that need immediate synchronization
- Interactive components where user input affects component state
- Scenarios requiring bidirectional data flow

---

### 8. What module is required for [(ngModel)]?

**Answer:** `FormsModule` must be imported in the module:

```typescript
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule]
})
```

---

### 9. Can you create custom two-way binding?

**Answer:** Yes, using `@Input()` and `@Output()` with naming convention:

```typescript
@Input() value: string;
@Output() valueChange = new EventEmitter<string>();

// Usage: [(value)]="myValue"
```

---

### 10. What is event binding?

**Answer:** Event binding allows responding to user actions (clicks, inputs, etc.) by binding DOM events to component methods using parentheses `()`.

```html
<button (click)="handleClick()">Click</button>
```

---

## Quick Reference

### Binding Syntax

| Type | Syntax | Direction | Example |
|------|--------|-----------|---------|
| Interpolation | `{{ }}` | Component → Template | `{{ title }}` |
| Property | `[]` | Component → Template | `[src]="url"` |
| Event | `()` | Template → Component | `(click)="fn()"` |
| Two-Way | `[()]` | Both | `[(ngModel)]="val"` |

---

**Master Angular Data Binding! 🅰️**