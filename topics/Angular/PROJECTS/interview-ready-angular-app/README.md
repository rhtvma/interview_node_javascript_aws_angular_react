# ShopIQ — Angular Interview-Ready App

A professional Angular 17 application covering all major Angular concepts with inline interview Q&A comments.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
ng serve

# 3. Open browser
http://localhost:4200
```

## 🔑 Demo Credentials
- **Email:** rohit@gmail.com
- **Password:** admin@123
- Or register a new account

## 📁 Project Structure

```
src/app/
├── core/
│   ├── guards/         auth.guard.ts       — CanActivateFn (functional guards)
│   ├── interceptors/   auth.interceptor.ts — HttpInterceptorFn
│   ├── services/       auth.service.ts     — BehaviorSubject, RxJS
│   │                   product.service.ts  — State management, Signals
│   │                   toast.service.ts    — Subject-based notifications
│   └── models.ts                           — TypeScript interfaces & types
├── shared/
│   ├── directives/     custom.directives.ts — Highlight, Ripple, LazyLoad, ClickOutside
│   └── pipes/          custom.pipes.ts      — CurrencyInr, Discount, Truncate, Stars
├── features/
│   ├── auth/login/     login.component.ts  — Reactive Forms, Validators
│   ├── auth/register/  register.component.ts — Cross-field validation
│   ├── dashboard/      dashboard.component.ts — combineLatest, OnPush, lifecycle
│   ├── products/       products.component.ts — Signals, ViewChild, debounceTime
│   └── profile/        profile.component.ts — Multi-tab forms, patchValue
├── app.component.ts    — Root, RouterOutlet, async pipe
├── app.routes.ts       — Lazy loading, route guards, titles
└── app.config.ts       — Standalone bootstrap, providers
```

## 🎯 Angular Topics Covered

| Topic | Location |
|-------|----------|
| Standalone Components | All components |
| Reactive Forms + Validators | Login, Register, Profile |
| Custom Validators | Register (passwordMatch), Profile |
| Route Guards (functional) | auth.guard.ts |
| Lazy Loading | app.routes.ts |
| HTTP Interceptors (functional) | auth.interceptor.ts |
| BehaviorSubject / Subject | auth.service.ts, product.service.ts |
| RxJS Operators (map, tap, combineLatest, debounceTime, takeUntil) | Services, Dashboard |
| ChangeDetectionStrategy.OnPush | Dashboard, Products |
| Signals + computed() | Products component |
| Custom Pipes (pure) | custom.pipes.ts |
| Custom Directives (Attribute + DOM) | custom.directives.ts |
| ViewChild / ElementRef | Products component |
| Lifecycle Hooks (OnInit, OnDestroy, AfterViewInit) | All components |
| trackBy in *ngFor | Dashboard, Products |
| async pipe | App component |
| TypeScript Generics & Interfaces | models.ts |
| Dependency Injection | All services |

## 💬 Interview Q&A

Every file ends with `// INTERVIEW QUESTIONS` block covering:
- Component architecture questions
- RxJS & reactive programming
- Change detection strategies
- Performance optimization
- TypeScript concepts

## 🔌 Backend Integration

The app uses `localStorage` as a mock backend. To integrate a real backend:

1. Replace `of(mockData).pipe(delay())` with `this.http.get<Type>(url)` in services
2. The `authInterceptor` already adds Bearer tokens to requests
3. The `errorInterceptor` handles 401/403/500 globally
4. Services expose the same Observable interface — no component changes needed!

```typescript
// Before (mock):
return of(this.MOCK_PRODUCTS).pipe(delay(600));

// After (real backend):
return this.http.get<Product[]>('/api/products');
```
