// ============================================
// AUTH SERVICE
// Interview Topics:
// - Injectable services & Dependency Injection
// - BehaviorSubject vs Subject vs ReplaySubject
// - LocalStorage for mock persistence
// - RxJS Observables
// ============================================

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User, AuthCredentials, RegisterData } from '../models';

// @Injectable({ providedIn: 'root' }) — Singleton service at root injector level
// This means Angular creates ONE instance shared across the entire app
@Injectable({ providedIn: 'root' })
export class AuthService {

  // BehaviorSubject: holds current value, emits to new subscribers immediately
  // vs Subject: no initial value, doesn't replay to late subscribers
  // vs ReplaySubject(n): replays last n values to new subscribers
  private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());

  // Expose as Observable (read-only) — consumers can't call .next() on this
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  // Computed observable — using RxJS map operator
  isAuthenticated$: Observable<boolean> = this.currentUser$.pipe(
    map(user => !!user)
  );

  constructor(private router: Router) {}

  // ---- Mock User Database (replaces backend) ----
  private getMockUsers(): User[] {
    const stored = localStorage.getItem('shopiq_users');
    if (stored) return JSON.parse(stored);

    // Seed default users
    const defaultUsers: User[] = [
      {
        id: '1',
        firstName: 'Arjun',
        lastName: 'Sharma',
        email: 'rohit@gmail.com',
        password: 'admin@123' as any,
        role: 'admin',
        joinedAt: new Date('2024-01-15'),
        avatar: 'AS',
        phone: '+91 98765 43210',
        address: { street: '42 MG Road', city: 'Gurugram', state: 'Haryana', zipCode: '122001', country: 'India' }
      } as any
    ];
    localStorage.setItem('shopiq_users', JSON.stringify(defaultUsers));
    return defaultUsers;
  }

  private saveMockUsers(users: any[]): void {
    localStorage.setItem('shopiq_users', JSON.stringify(users));
  }

  private getStoredUser(): User | null {
    try {
      const raw = localStorage.getItem('shopiq_current_user');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  // ---- Auth Methods ----

  login(credentials: AuthCredentials): Observable<User> {
    // Simulates HTTP call with delay — replace with this.http.post<...>()
    return of(null).pipe(
      delay(800), // Simulate network latency
      map(() => {
        const users = this.getMockUsers() as any[];
        const user = users.find(
          u => u.email === credentials.email && u.password === credentials.password
        );
        if (!user) throw new Error('Invalid email or password');
        const { password, ...safeUser } = user; // Strip password before storing
        return safeUser as User;
      }),
      tap(user => this.setCurrentUser(user))
    );
  }

  register(data: RegisterData): Observable<User> {
    return of(null).pipe(
      delay(1000),
      map(() => {
        const users = this.getMockUsers() as any[];
        if (users.find(u => u.email === data.email)) {
          throw new Error('Email already registered');
        }
        const newUser: any = {
          id: Date.now().toString(),
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          role: 'user',
          joinedAt: new Date(),
          avatar: `${data.firstName[0]}${data.lastName[0]}`.toUpperCase()
        };
        users.push(newUser);
        this.saveMockUsers(users);
        const { password, ...safeUser } = newUser;
        return safeUser as User;
      }),
      tap(user => this.setCurrentUser(user))
    );
  }

  logout(): void {
    localStorage.removeItem('shopiq_current_user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  updateProfile(updates: Partial<User>): Observable<User> {
    return of(null).pipe(
      delay(600),
      map(() => {
        const current = this.currentUserSubject.value!;
        const updated = { ...current, ...updates };
        // Also update in mock DB
        const users = this.getMockUsers() as any[];
        const idx = users.findIndex(u => u.id === current.id);
        if (idx !== -1) { users[idx] = { ...users[idx], ...updates }; this.saveMockUsers(users); }
        return updated;
      }),
      tap(user => this.setCurrentUser(user))
    );
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value; // Synchronous access to current value
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem('shopiq_current_user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}

// ============================================
// INTERVIEW QUESTIONS — Services & RxJS
// ============================================
/*
Q1. What is Dependency Injection (DI) in Angular?
    - Angular's DI system provides dependencies to classes without them creating instances.
    - { providedIn: 'root' } = singleton at root level, tree-shakeable.
    - Services can also be provided at component level (new instance per component).

Q2. What is the difference between BehaviorSubject, Subject, and ReplaySubject?
    - Subject: no initial value, doesn't emit to late subscribers.
    - BehaviorSubject: requires initial value, emits current value to new subscribers.
    - ReplaySubject(n): buffers last n values, replays to late subscribers.
    - AsyncSubject: only emits the last value, and only on completion.

Q3. What is the difference between hot and cold Observables?
    - Cold: starts producing values when subscribed (e.g., HTTP calls, of(), from())
    - Hot: produces values regardless of subscribers (e.g., Subjects, DOM events, WebSockets)
    - BehaviorSubject is hot — it holds state independently.

Q4. Explain RxJS operators: map, tap, switchMap, mergeMap, catchError.
    - map: transforms emitted values
    - tap: side effects without modifying stream
    - switchMap: cancels previous inner observable (good for search)
    - mergeMap: runs all inner observables concurrently
    - catchError: handles errors in the stream

Q5. What is the difference between Observable and Promise?
    - Observable: lazy, cancellable, multiple values over time, composable
    - Promise: eager, not cancellable, single value, simpler
    - Use toPromise() / firstValueFrom() to convert
*/
