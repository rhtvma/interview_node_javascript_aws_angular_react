// ============================================
// PROFILE COMPONENT
// Interview Topics:
// - Reactive Forms with pre-populated values
// - FormGroup reset, patchValue
// - Component Output/Input communication pattern
// - Custom form validation
// ============================================

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { ProductService } from '../../core/services/product.service';
import { User } from '../../core/models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="profile-page page-enter">
      <div class="container">
        <header class="page-header">
          <h1>Profile Settings</h1>
          <p class="text-muted">Manage your account and preferences</p>
        </header>

        <div class="profile-layout">
          <!-- Left — User info card -->
          <aside class="profile-aside">
            <div class="profile-card card">
              <div class="avatar-section">
                <div class="avatar-large">{{ user?.avatar }}</div>
                <button class="avatar-edit btn btn-ghost btn-sm">
                  <span class="material-icons-round">photo_camera</span>
                  Change Photo
                </button>
              </div>
              <div class="profile-info">
                <h2>{{ user?.firstName }} {{ user?.lastName }}</h2>
                <p class="text-muted text-sm">{{ user?.email }}</p>
                <span class="badge badge-accent" style="margin-top:8px">{{ user?.role | titlecase }}</span>
              </div>
              <div class="divider"></div>
              <div class="profile-stats">
                <div class="pstat">
                  <span class="pstat-value">{{ favCount }}</span>
                  <span class="pstat-label">Saved Items</span>
                </div>
                <div class="pstat">
                  <span class="pstat-value">{{ cartCount }}</span>
                  <span class="pstat-label">In Cart</span>
                </div>
                <div class="pstat">
                  <span class="pstat-value">{{ daysSinceJoined }}</span>
                  <span class="pstat-label">Days Active</span>
                </div>
              </div>
              <div class="divider"></div>
              <div class="member-since">
                <span class="material-icons-round" style="color:var(--color-accent)">verified</span>
                <div>
                  <p class="text-sm font-medium">Verified Member</p>
                  <p class="text-xs text-muted">Since {{ user?.joinedAt | date:'MMM yyyy' }}</p>
                </div>
              </div>
            </div>

            <!-- Danger zone -->
            <div class="danger-zone card">
              <h3>Danger Zone</h3>
              <p class="text-muted text-sm" style="margin-top:8px;margin-bottom:16px">
                Once you delete your account, there is no going back.
              </p>
              <button class="btn btn-danger btn-sm" (click)="confirmDelete()">
                <span class="material-icons-round">delete_forever</span>
                Delete Account
              </button>
            </div>
          </aside>

          <!-- Right — Edit forms -->
          <main class="profile-main">
            <!-- Tab navigation -->
            <div class="tab-nav">
              <button class="tab-btn" [class.active]="activeTab === 'personal'"
                      (click)="activeTab = 'personal'">
                <span class="material-icons-round">person</span> Personal Info
              </button>
              <button class="tab-btn" [class.active]="activeTab === 'address'"
                      (click)="activeTab = 'address'">
                <span class="material-icons-round">location_on</span> Address
              </button>
              <button class="tab-btn" [class.active]="activeTab === 'security'"
                      (click)="activeTab = 'security'">
                <span class="material-icons-round">lock</span> Security
              </button>
            </div>

            <!-- Personal Info Tab -->
            <div class="tab-panel card" *ngIf="activeTab === 'personal'">
              <h2>Personal Information</h2>
              <p class="text-muted text-sm" style="margin-bottom:24px">Update your name and contact details</p>

              <form [formGroup]="personalForm" (ngSubmit)="savePersonal()" class="profile-form">
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">First Name</label>
                    <input type="text" formControlName="firstName" class="form-input"
                           [class.error]="isInvalid(personalForm, 'firstName')">
                    <span class="form-error" *ngIf="isInvalid(personalForm, 'firstName')">Required</span>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Last Name</label>
                    <input type="text" formControlName="lastName" class="form-input"
                           [class.error]="isInvalid(personalForm, 'lastName')">
                    <span class="form-error" *ngIf="isInvalid(personalForm, 'lastName')">Required</span>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Email Address</label>
                  <input type="email" formControlName="email" class="form-input"
                         [class.error]="isInvalid(personalForm, 'email')">
                  <span class="form-error" *ngIf="isInvalid(personalForm, 'email')">Valid email required</span>
                </div>

                <div class="form-group">
                  <label class="form-label">Phone Number</label>
                  <input type="tel" formControlName="phone" class="form-input"
                         placeholder="+91 98765 43210">
                </div>

                <div class="form-actions">
                  <button type="button" class="btn btn-secondary" (click)="resetPersonal()">
                    <span class="material-icons-round">refresh</span> Reset
                  </button>
                  <button type="submit" class="btn btn-primary" [disabled]="savingPersonal">
                    <span class="spinner" *ngIf="savingPersonal"></span>
                    <span class="material-icons-round" *ngIf="!savingPersonal">save</span>
                    {{ savingPersonal ? 'Saving...' : 'Save Changes' }}
                  </button>
                </div>
              </form>
            </div>

            <!-- Address Tab -->
            <div class="tab-panel card" *ngIf="activeTab === 'address'">
              <h2>Delivery Address</h2>
              <p class="text-muted text-sm" style="margin-bottom:24px">Your default shipping address</p>

              <form [formGroup]="addressForm" (ngSubmit)="saveAddress()" class="profile-form">
                <div class="form-group">
                  <label class="form-label">Street Address</label>
                  <input type="text" formControlName="street" class="form-input"
                         placeholder="42 MG Road, Sector 14">
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">City</label>
                    <input type="text" formControlName="city" class="form-input" placeholder="Gurugram">
                  </div>
                  <div class="form-group">
                    <label class="form-label">State</label>
                    <input type="text" formControlName="state" class="form-input" placeholder="Haryana">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">ZIP Code</label>
                    <input type="text" formControlName="zipCode" class="form-input" placeholder="122001">
                  </div>
                  <div class="form-group">
                    <label class="form-label">Country</label>
                    <select formControlName="country" class="form-input">
                      <option value="India">India</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                </div>
                <div class="form-actions">
                  <button type="submit" class="btn btn-primary" [disabled]="savingAddress">
                    <span class="spinner" *ngIf="savingAddress"></span>
                    <span class="material-icons-round" *ngIf="!savingAddress">save</span>
                    {{ savingAddress ? 'Saving...' : 'Save Address' }}
                  </button>
                </div>
              </form>
            </div>

            <!-- Security Tab -->
            <div class="tab-panel card" *ngIf="activeTab === 'security'">
              <h2>Security Settings</h2>
              <p class="text-muted text-sm" style="margin-bottom:24px">Update your password to keep your account secure</p>

              <form [formGroup]="securityForm" (ngSubmit)="savePassword()" class="profile-form">
                <div class="form-group">
                  <label class="form-label">Current Password</label>
                  <input type="password" formControlName="currentPassword" class="form-input"
                         [class.error]="isInvalid(securityForm, 'currentPassword')">
                  <span class="form-error" *ngIf="isInvalid(securityForm, 'currentPassword')">Required</span>
                </div>
                <div class="form-group">
                  <label class="form-label">New Password</label>
                  <input type="password" formControlName="newPassword" class="form-input"
                         [class.error]="isInvalid(securityForm, 'newPassword')">
                  <span class="form-error" *ngIf="isInvalid(securityForm, 'newPassword')">
                    Min 8 characters required
                  </span>
                </div>
                <div class="form-group">
                  <label class="form-label">Confirm New Password</label>
                  <input type="password" formControlName="confirmNewPassword" class="form-input"
                         [class.error]="securityForm.hasError('mismatch') && securityForm.get('confirmNewPassword')?.touched">
                  <span class="form-error" *ngIf="securityForm.hasError('mismatch') && securityForm.get('confirmNewPassword')?.touched">
                    Passwords do not match
                  </span>
                </div>

                <!-- Password tips -->
                <div class="password-tips">
                  <p class="text-xs font-semibold text-muted">Password should have:</p>
                  <div class="tip-list">
                    <span class="tip" [class.met]="hasLength">
                      <span class="material-icons-round">{{ hasLength ? 'check_circle' : 'radio_button_unchecked' }}</span>
                      At least 8 characters
                    </span>
                    <span class="tip" [class.met]="hasUpper">
                      <span class="material-icons-round">{{ hasUpper ? 'check_circle' : 'radio_button_unchecked' }}</span>
                      One uppercase letter
                    </span>
                    <span class="tip" [class.met]="hasNumber">
                      <span class="material-icons-round">{{ hasNumber ? 'check_circle' : 'radio_button_unchecked' }}</span>
                      One number
                    </span>
                  </div>
                </div>

                <div class="form-actions">
                  <button type="submit" class="btn btn-primary" [disabled]="savingPassword">
                    <span class="spinner" *ngIf="savingPassword"></span>
                    <span class="material-icons-round" *ngIf="!savingPassword">lock_reset</span>
                    {{ savingPassword ? 'Updating...' : 'Update Password' }}
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  activeTab: 'personal' | 'address' | 'security' = 'personal';
  favCount = 0;
  cartCount = 0;
  savingPersonal = false;
  savingAddress = false;
  savingPassword = false;

  personalForm!: FormGroup;
  addressForm!: FormGroup;
  securityForm!: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private productService: ProductService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      this.user = user;
      this.initForms(user);
    });

    this.productService.favorites$.pipe(takeUntil(this.destroy$)).subscribe(favs => {
      this.favCount = favs.size;
    });

    this.productService.cartCount$.pipe(takeUntil(this.destroy$)).subscribe(count => {
      this.cartCount = count;
    });

    // React to password field changes for tips
    this.securityForm.get('newPassword')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {}); // Triggers CD so computed getters update
  }

  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }

  private initForms(user: User | null): void {
    // patchValue: populate form with existing user data
    this.personalForm = this.fb.group({
      firstName: [user?.firstName || '', Validators.required],
      lastName: [user?.lastName || '', Validators.required],
      email: [user?.email || '', [Validators.required, Validators.email]],
      phone: [user?.phone || '']
    });

    this.addressForm = this.fb.group({
      street: [user?.address?.street || ''],
      city: [user?.address?.city || ''],
      state: [user?.address?.state || ''],
      zipCode: [user?.address?.zipCode || ''],
      country: [user?.address?.country || 'India']
    });

    this.securityForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', Validators.required]
    }, {
      validators: (g: AbstractControl) => {
        const newPwd = g.get('newPassword')?.value;
        const confirm = g.get('confirmNewPassword')?.value;
        return newPwd && confirm && newPwd !== confirm ? { mismatch: true } : null;
      }
    });
  }

  isInvalid(form: FormGroup, field: string): boolean {
    const c = form.get(field);
    return !!(c?.invalid && c?.touched);
  }

  savePersonal(): void {
    this.personalForm.markAllAsTouched();
    if (this.personalForm.invalid) return;
    this.savingPersonal = true;
    this.authService.updateProfile(this.personalForm.value).subscribe({
      next: () => { this.savingPersonal = false; this.toastService.success('Profile updated!'); },
      error: () => { this.savingPersonal = false; this.toastService.error('Failed to update profile'); }
    });
  }

  saveAddress(): void {
    this.savingAddress = true;
    this.authService.updateProfile({ address: this.addressForm.value }).subscribe({
      next: () => { this.savingAddress = false; this.toastService.success('Address saved!'); },
      error: () => { this.savingAddress = false; }
    });
  }

  savePassword(): void {
    this.securityForm.markAllAsTouched();
    if (this.securityForm.invalid) return;
    this.savingPassword = true;
    // Simulate password update
    setTimeout(() => {
      this.savingPassword = false;
      this.securityForm.reset();
      this.toastService.success('Password updated successfully!');
    }, 1000);
  }

  resetPersonal(): void {
    this.initForms(this.user);
    this.toastService.info('Changes discarded');
  }

  confirmDelete(): void {
    if (confirm('Are you sure? This action cannot be undone.')) {
      this.toastService.error('Account deletion requires backend integration');
    }
  }

  get daysSinceJoined(): number {
    if (!this.user?.joinedAt) return 0;
    return Math.floor((Date.now() - new Date(this.user.joinedAt).getTime()) / 86400000);
  }

  get hasLength(): boolean { return (this.securityForm.get('newPassword')?.value?.length || 0) >= 8; }
  get hasUpper(): boolean { return /[A-Z]/.test(this.securityForm.get('newPassword')?.value || ''); }
  get hasNumber(): boolean { return /\d/.test(this.securityForm.get('newPassword')?.value || ''); }
}
