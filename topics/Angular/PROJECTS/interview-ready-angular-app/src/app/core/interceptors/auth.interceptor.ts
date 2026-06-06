// ============================================
// HTTP INTERCEPTOR
// Interview Topics:
// - HttpInterceptorFn (Angular 15+ functional style)
// - Adding auth headers, handling errors globally
// ============================================

import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

// Functional interceptor (Angular 15+) — replaces class implementing HttpInterceptor
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Clone the request to add auth header (Requests are IMMUTABLE in Angular)
  const token = localStorage.getItem('shopiq_token');
  const authReq = token
    ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
    : req;

  return next(authReq);
};

// Error handling interceptor
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout(); // Token expired — log out
        toastService.error('Session expired. Please login again.');
      } else if (error.status === 403) {
        toastService.error('You do not have permission for this action.');
      } else if (error.status >= 500) {
        toastService.error('Server error. Please try again later.');
      }
      return throwError(() => error); // Re-throw for component-level handling
    })
  );
};

// ============================================
// INTERVIEW QUESTIONS — Interceptors
// ============================================
/*
Q1. What is an HTTP Interceptor and when do you use it?
    - Middleware for HTTP requests/responses
    - Use cases: auth headers, logging, loading spinner, error handling, caching

Q2. Why must you clone the request before modifying it?
    - HttpRequest is immutable (readonly properties)
    - req.clone() creates a new instance with modifications
    - Immutability prevents accidental side effects

Q3. What's the execution order of multiple interceptors?
    - Registered in order; applied like middleware chain
    - Request: first → last; Response: last → first (like a stack)
    - In provideHttpClient(withInterceptors([A, B, C])): A wraps B wraps C

Q4. How do you add a loading spinner using interceptors?
    - Keep a count of pending requests
    - Increment on request, decrement on response (using finalize operator)
    - Show/hide spinner based on count > 0
*/
