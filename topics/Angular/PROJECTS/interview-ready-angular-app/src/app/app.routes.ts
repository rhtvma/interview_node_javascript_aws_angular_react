// ============================================
// ROUTING CONFIGURATION
// Interview Topics: Lazy loading, Route guards,
// Wildcard routes, Route params, Child routes
// ============================================

import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

// Routes with lazy loading — loadComponent() is Angular 14+ for standalone components
// Interview: Lazy loading splits app into chunks loaded on demand (better initial load)
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full' // 'full' matches exactly ''; 'prefix' matches anything starting with ''
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
    canActivate: [guestGuard], // Redirect to dashboard if already logged in
    title: 'Login — ShopIQ' // Route title (sets document.title)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent),
    canActivate: [guestGuard],
    title: 'Create Account — ShopIQ'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard], // Protected route
    title: 'Dashboard — ShopIQ'
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products.component').then(m => m.ProductsComponent),
    canActivate: [authGuard],
    title: 'Products — ShopIQ'
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard],
    title: 'Profile — ShopIQ'
  },
  {
    path: '**', // Wildcard — must be LAST in routes array
    redirectTo: 'dashboard'
  }
];

// ============================================
// INTERVIEW QUESTIONS — Routing
// ============================================
/*
Q1. What is lazy loading and why is it important?
    - Splits app into JS chunks loaded only when needed
    - Improves initial page load time significantly
    - Angular creates separate bundles for each lazy-loaded feature
    - Use the Network tab to see chunks load on navigation

Q2. What is the difference between pathMatch: 'full' and 'prefix'?
    - 'full': URL must match the path exactly (used for redirects from '')
    - 'prefix': URL just needs to START with the path (default)
    - Always use 'full' for empty string ('') redirects

Q3. What is preloading strategy in Angular?
    - PreloadAllModules: preloads lazy modules in background after initial load
    - RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    - Custom strategies: implement PreloadingStrategy interface

Q4. How do you pass data through routes?
    - Route params: /products/:id (required) — accessed via ActivatedRoute.params
    - Query params: /products?category=Electronics — ActivatedRoute.queryParams
    - Route data: { path: 'about', data: { title: 'About' } } — static data
    - Router state: router.navigate(['/profile'], { state: { fromDashboard: true } })

Q5. What is the difference between Router.navigate() and Router.navigateByUrl()?
    - navigate(['path', param]): relative by default, array-based, type-safe
    - navigateByUrl('/path/param'): always absolute, string-based
    - Both accept NavigationExtras for queryParams, fragment, state, etc.
*/
