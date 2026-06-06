// ============================================
// APP CONFIG — Standalone bootstrapping
// Interview Topic: provideRouter, provideHttpClient,
// withComponentInputBinding, functional interceptors
// ============================================

import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { authInterceptor, errorInterceptor } from './core/interceptors/auth.interceptor';

// ApplicationConfig replaces AppModule for standalone apps (Angular 17+)
// Interview: What are providers? Objects that tell Angular how to create dependencies
export const appConfig: ApplicationConfig = {
  providers: [
    // Router with optional features
    provideRouter(
      routes,
      withComponentInputBinding(), // Allows route params to be bound as @Input()
      withViewTransitions()         // Enables View Transitions API for route animations
    ),

    // HttpClient with functional interceptors
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    ),

    // Enable Angular animations
    provideAnimations(),
  ]
};

// ============================================
// INTERVIEW QUESTIONS — App Bootstrap
// ============================================
/*
Q1. What is the difference between NgModule-based and Standalone Angular apps?
    - NgModule: declarations[], imports[], providers[], bootstrap[] in @NgModule
    - Standalone: @Component({ standalone: true, imports: [...] }) — no NgModule needed
    - Standalone is the default from Angular 17, recommended for new projects

Q2. What is APP_INITIALIZER?
    - A multi-provider token that runs functions before app bootstraps
    - Use case: loading config from server, checking auth state
    - providers: [{ provide: APP_INITIALIZER, useFactory: initApp, multi: true }]

Q3. What does withComponentInputBinding() do?
    - Allows route params/queryParams to be automatically bound as @Input() properties
    - Without it: must inject ActivatedRoute and subscribe to params
    - With it: @Input() id!: string automatically gets the :id route param
*/
