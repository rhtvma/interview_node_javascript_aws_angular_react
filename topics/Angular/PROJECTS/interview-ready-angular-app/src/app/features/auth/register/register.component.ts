// ============================================
// REGISTER COMPONENT
// Interview Topics: Custom validators, cross-field validation,
// FormArray, Lifecycle hooks
// ============================================

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import {
  ReactiveFormsModule, FormBuilder, FormGroup,
  Validators, AbstractControl, ValidationErrors, ValidatorFn
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

// Custom cross-field validator — attached to FormGroup
const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password && confirmPassword && password !== confirmPassword
    ? { passwordMismatch: true }
    : null;
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <div class="auth-page">
      <div class="auth-bg">
        <div class="bg-orb orb-1"></div>
        <div class="bg-orb orb-2"></div>
      </div>

      <div class="auth-container">
        <div class="auth-brand">
          <span class="brand-icon">◈</span>
          <span>ShopIQ</span>
        </div>

        <div class="auth-card">
          <div class="auth-header">
            <h1>Create account</h1>
            <p>Join thousands of smart shoppers</p>
          </div>

          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="auth-form" novalidate>
            <div class="name-row">
              <div class="form-group">
                <label class="form-label">First Name</label>
                <input type="text" formControlName="firstName" class="form-input"
                       [class.error]="isInvalid('firstName')" placeholder="Rohit">
                <span class="form-error" *ngIf="isInvalid('firstName')">Required</span>
              </div>
              <div class="form-group">
                <label class="form-label">Last Name</label>
                <input type="text" formControlName="lastName" class="form-input"
                       [class.error]="isInvalid('lastName')" placeholder="Verma">
                <span class="form-error" *ngIf="isInvalid('lastName')">Required</span>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" formControlName="email" class="form-input"
                     [class.error]="isInvalid('email')" placeholder="you@example.com">
              <span class="form-error" *ngIf="isInvalid('email')">
                <span *ngIf="getField('email')?.hasError('required')">Email is required</span>
                <span *ngIf="getField('email')?.hasError('email')">Invalid email format</span>
              </span>
            </div>

            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" formControlName="password" class="form-input"
                     [class.error]="isInvalid('password')" placeholder="Min. 8 characters">
              <span class="form-error" *ngIf="isInvalid('password')">
                <span *ngIf="getField('password')?.hasError('required')">Password is required</span>
                <span *ngIf="getField('password')?.hasError('minlength')">Minimum 8 characters</span>
                <span *ngIf="getField('password')?.hasError('pattern')">Must include uppercase, number & symbol</span>
              </span>
              <!-- Password strength indicator -->
              <div class="strength-bar" *ngIf="getField('password')?.value">
                <div class="strength-fill" [style.width]="getPasswordStrength() + '%'"
                     [style.background]="getStrengthColor()"></div>
              </div>
              <span class="text-xs text-muted" *ngIf="getField('password')?.value">
                Strength: {{ getStrengthLabel() }}
              </span>
            </div>

            <div class="form-group">
              <label class="form-label">Confirm Password</label>
              <input type="password" formControlName="confirmPassword" class="form-input"
                     [class.error]="isInvalid('confirmPassword') || (registerForm.hasError('passwordMismatch') && getField('confirmPassword')?.touched)"
                     placeholder="Repeat password">
              <!-- Cross-field validation error from parent FormGroup -->
              <span class="form-error" *ngIf="registerForm.hasError('passwordMismatch') && getField('confirmPassword')?.touched">
                Passwords do not match
              </span>
            </div>

            <!-- Terms checkbox -->
            <label class="checkbox-label">
              <input type="checkbox" formControlName="acceptTerms" class="checkbox-input">
              <span class="checkbox-custom"></span>
              <span class="text-sm text-muted">
                I agree to the <span class="text-accent" style="cursor:pointer">Terms of Service</span>
                and <span class="text-accent" style="cursor:pointer">Privacy Policy</span>
              </span>
            </label>
            <span class="form-error" *ngIf="isInvalid('acceptTerms')">You must accept the terms</span>

            <!-- API error -->
            <div class="api-error" *ngIf="serverError">
              <span class="material-icons-round">error_outline</span>
              {{ serverError }}
            </div>

            <button type="submit" class="btn btn-primary w-full submit-btn" [disabled]="loading">
              <span class="spinner" *ngIf="loading"></span>
              <span>{{ loading ? 'Creating account...' : 'Create Account' }}</span>
            </button>
          </form>

          <div class="auth-footer">
            Already have an account?
            <a routerLink="/login" class="text-accent">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  serverError = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        // Pattern: uppercase + number + special char
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validators: passwordMatchValidator // Cross-field validator on the group
    });
  }

  onSubmit(): void {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.serverError = '';

    const { confirmPassword, acceptTerms, ...data } = this.registerForm.value;
    this.authService.register(data).subscribe({
      next: () => {
        this.toast.success('Account created! Welcome to ShopIQ 🎉');
        this.router.navigate(['/dashboard']);
      },
      error: (err: Error) => {
        this.serverError = err.message;
        this.loading = false;
      }
    });
  }

  isInvalid(field: string): boolean {
    const c = this.getField(field);
    return !!(c?.invalid && c?.touched);
  }

  getField(field: string): AbstractControl | null {
    return this.registerForm.get(field);
  }

  getPasswordStrength(): number {
    const pwd = this.getField('password')?.value || '';
    let score = 0;
    if (pwd.length >= 8) score += 25;
    if (/[A-Z]/.test(pwd)) score += 25;
    if (/\d/.test(pwd)) score += 25;
    if (/[@$!%*?&]/.test(pwd)) score += 25;
    return score;
  }

  getStrengthColor(): string {
    const s = this.getPasswordStrength();
    if (s <= 25) return 'var(--color-danger)';
    if (s <= 50) return '#e09f47';
    if (s <= 75) return 'var(--color-info)';
    return 'var(--color-success)';
  }

  getStrengthLabel(): string {
    const s = this.getPasswordStrength();
    if (s <= 25) return 'Weak';
    if (s <= 50) return 'Fair';
    if (s <= 75) return 'Good';
    return 'Strong';
  }
}
