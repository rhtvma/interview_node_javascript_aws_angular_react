# Tech Mahindra Interview Questions

## 1. What Is Property Binding?

Property binding is used in Angular to bind a component property to a DOM property or directive input.

Example:

```html
<img [src]="imageUrl" [alt]="imageTitle" />
<button [disabled]="isSaving">Save</button>
```

Here, `imageUrl`, `imageTitle`, and `isSaving` are component properties.

## 2. Can We Use Property Binding in a Directive?

Yes. Property binding can be used to pass values to directive inputs.

Example:

```ts
@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() appHighlight = 'yellow';
}
```

Usage:

```html
<p [appHighlight]="selectedColor">Highlighted text</p>
```

Angular passes the value of `selectedColor` to the directive input.

## 3. Difference Between Inner Join and Outer Join

An inner join returns only matching records from both tables.

```sql
SELECT employees.name, departments.name
FROM employees
INNER JOIN departments
  ON employees.department_id = departments.id;
```

An outer join returns matching records plus unmatched records from one or both tables.

Types of outer joins:

| Join | Result |
| --- | --- |
| `LEFT JOIN` | All rows from left table and matching rows from right table |
| `RIGHT JOIN` | All rows from right table and matching rows from left table |
| `FULL OUTER JOIN` | All rows from both tables, matched where possible |

## 4. What Is Middleware in Node.js and What Is Its Use?

Middleware is a function that runs during the request-response cycle. It can read or modify the request, send a response, or pass control to the next middleware.

Example:

```js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

Common uses:

- Logging.
- Authentication.
- Authorization.
- Request body parsing.
- Error handling.
- Validation.

## 5. What Is the Use of the `next` Callback?

`next()` passes control to the next middleware in the chain.

Example:

```js
app.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized');
  }

  next();
});
```

If `next()` is not called and no response is sent, the request may remain pending.
