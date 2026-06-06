// ============================================
// AUTH GUARD
// Interview Topic: Route Guards — CanActivate, CanActivateFn
// Angular 15+ prefers functional guards over class-based
// ============================================

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Functional Guard (Angular 15+) — preferred over class-based CanActivate
// Interview Q: Why move to functional guards?
// A: Less boilerplate, tree-shakeable, composable, easier testing
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // inject() works outside constructor in Angular 14+
  const router = inject(Router);

  if (authService.currentUser) {
    return true;
  }

  // Store the attempted URL for redirecting after login
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

// Guard for guests-only routes (login/register pages)
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.currentUser) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};

// ============================================
// INTERVIEW QUESTIONS — Route Guards
// ============================================
/*
Q1. What are the types of route guards in Angular?
    - CanActivate: controls if route can be activated
    - CanActivateChild: controls if child routes can be activated
    - CanDeactivate: controls if you can leave a route (e.g., unsaved form)
    - CanLoad/CanMatch: prevents lazy-loaded modules from loading
    - Resolve: pre-fetches data before route activates

Q2. What is the difference between CanActivate and CanLoad?
    - CanActivate: runs every time route is navigated to (module already loaded)
    - CanLoad: runs before lazy-loading the module (prevents even downloading the JS)
    - CanLoad is more secure: unauthorized users don't even download the code

Q3. How does inject() work outside of constructor?
    - Angular 14+ allows inject() in injection context
    - Works in: factory functions, functional guards, functional interceptors, initializers
    - Internally uses the current injector context

Q4. What is a Resolve guard and how does it differ from component-level data fetching?
    - Resolve: pre-fetches data before activating route; page shown only after data ready
    - Component-level: component loads first, then data loads (shows loading state)
    - Resolve: better for SEO; Component-level: better UX (progressive loading)
*/
