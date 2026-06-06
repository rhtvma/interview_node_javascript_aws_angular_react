// ============================================
// LOGIN COMPONENT
// Interview Topics:
// - Reactive Forms (FormBuilder, FormGroup, Validators)
// - Lifecycle hooks: OnInit
// - Template-driven vs Reactive forms
// ============================================

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import {
  ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <div class="auth-page">
      <!-- Decorative background -->
      <div class="auth-bg">
        <div class="bg-orb orb-1"></div>
        <div class="bg-orb orb-2"></div>
      </div>

      <div class="auth-container">
        <!-- Brand -->
        <div class="auth-brand">
          <span class="brand-icon">◈</span>
          <span class="brand-text">ShopIQ</span>
        </div>

        <div class="auth-card">
          <div class="auth-header">
            <h1>Welcome back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          <!-- Reactive Form — two-way binding via formControlName -->
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="auth-form" novalidate>

            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input
                type="email"
                formControlName="email"
                class="form-input"
                [class.error]="isFieldInvalid('email')"
                placeholder="you@example.com"
                autocomplete="email"
              >
              <!-- Validation error messages -->
              <span class="form-error" *ngIf="isFieldInvalid('email')">
                <span *ngIf="getField('email')?.hasError('required')">Email is required</span>
                <span *ngIf="getField('email')?.hasError('email')">Please enter a valid email</span>
              </span>
            </div>

            <div class="form-group">
              <div class="label-row">
                <label class="form-label">Password</label>
                <span class="text-accent text-sm" style="cursor:pointer">Forgot password?</span>
              </div>
              <div class="input-wrapper">
                <input
                  [type]="showPassword ? 'text' : 'password'"
                  formControlName="password"
                  class="form-input"
                  [class.error]="isFieldInvalid('password')"
                  placeholder="Enter your password"
                  autocomplete="current-password"
                >
                <button type="button" class="toggle-password" (click)="showPassword = !showPassword">
                  <span class="material-icons-round">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                </button>
              </div>
              <span class="form-error" *ngIf="isFieldInvalid('password')">
                <span *ngIf="getField('password')?.hasError('required')">Password is required</span>
                <span *ngIf="getField('password')?.hasError('minlength')">At least 6 characters required</span>
              </span>
            </div>

            <!-- API error -->
            <div class="api-error" *ngIf="serverError">
              <span class="material-icons-round">error_outline</span>
              {{ serverError }}
            </div>

            <button type="submit" class="btn btn-primary w-full submit-btn"
                    [disabled]="loading">
              <span class="spinner" *ngIf="loading"></span>
              <span>{{ loading ? 'Signing in...' : 'Sign In' }}</span>
            </button>

            <!-- Demo credentials hint -->
            <div class="demo-hint">
              <span>Demo:</span>
              <button type="button" class="demo-fill" (click)="fillDemo()">
                rohit@gmail.com / admin@123
              </button>
            </div>
          </form>

          <div class="auth-footer">
            Don't have an account?
            <a routerLink="/register" class="text-accent">Create one free</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // FormGroup — the reactive form model
  loginForm!: FormGroup;
  loading = false;
  serverError = '';
  showPassword = false;
  private returnUrl = '/dashboard';

  // FormBuilder: injectable service to create forms (less verbose than new FormGroup())
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    // Build the form with validation rules
    this.loginForm = this.fb.group({
      // [initialValue, syncValidators, asyncValidators]
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Get return URL from route query params
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  onSubmit(): void {
    // Mark all fields as touched to show validation errors
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.serverError = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.toast.success('Welcome back!');
        this.router.navigate([this.returnUrl]);
      },
      error: (err: Error) => {
        this.serverError = err.message;
        this.loading = false;
      }
    });
  }

  // Helper: check if a field should show error
  // Interview: When to show validation? Only after field is touched (not on page load)
  isFieldInvalid(field: string): boolean {
    const control = this.getField(field);
    return !!(control?.invalid && control?.touched);
  }

  getField(field: string): AbstractControl | null {
    return this.loginForm.get(field);
  }

  fillDemo(): void {
    this.loginForm.patchValue({ email: 'rohit@gmail.com', password: 'admin@123' });
  }
}

// ============================================
// INTERVIEW QUESTIONS — Reactive Forms
// ============================================
/*
Q1. What is the difference between Reactive Forms and Template-Driven Forms?
    - Reactive: form model in component class. More control, easier testing, scalable.
    - Template-driven: form model in template via ngModel. Simpler but less flexible.
    - Reactive: synchronous; Template-driven: asynchronous (uses ngModel directives)

Q2. What is FormGroup, FormControl, and FormArray?
    - FormControl: individual field (email, password)
    - FormGroup: group of controls (the entire form, or nested sections)
    - FormArray: dynamic array of controls (e.g., adding phone numbers)

Q3. What is the difference between setValue() and patchValue()?
    - setValue(): must provide ALL controls; throws error if any missing
    - patchValue(): partial update; ignores missing controls (safer)

Q4. What are async validators and when do you use them?
    - Return Observable<ValidationErrors | null> or Promise
    - Use for server-side checks: email already taken, username available
    - Third arg in FormControl: new FormControl('', [], [emailExistsValidator])

Q5. How do you create a custom validator?
    - ValidatorFn: (control: AbstractControl) => ValidationErrors | null
    - Cross-field validator: attach to FormGroup to access multiple fields
    - Example: password confirmation validator on FormGroup level
*/
