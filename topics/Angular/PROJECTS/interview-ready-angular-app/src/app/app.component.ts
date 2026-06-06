// ============================================
// APP COMPONENT — Root Component
// Interview Topics: Standalone components, RouterOutlet, AsyncPipe
// ============================================

import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
import { ProductService } from './core/services/product.service';
import { ToastService, Toast } from './core/services/toast.service';
import { User } from './core/models';

// Standalone component — no NgModule needed!
// Interview: Angular 14+ standalone; 'imports' replaces NgModule imports
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <!-- RouterOutlet renders the active route's component -->
    <!-- Interview: How does router work? RouterModule.forRoot() sets up routes,
         RouterOutlet is the placeholder, router-link navigates -->

    <div class="app-wrapper">
      <!-- Navbar — shown only when authenticated -->
      <nav class="navbar" *ngIf="isAuthenticated$ | async">
        <div class="container">
          <div class="nav-content">
            <!-- Brand -->
            <a routerLink="/dashboard" class="brand">
              <span class="brand-icon">◈</span>
              <span class="brand-name">ShopIQ</span>
            </a>

            <!-- Nav Links -->
            <div class="nav-links">
              <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">
                <span class="material-icons-round">dashboard</span>
                <span>Dashboard</span>
              </a>
              <a routerLink="/products" routerLinkActive="active" class="nav-link">
                <span class="material-icons-round">storefront</span>
                <span>Products</span>
              </a>
              <a routerLink="/profile" routerLinkActive="active" class="nav-link">
                <span class="material-icons-round">person</span>
                <span>Profile</span>
              </a>
            </div>

            <!-- Right side actions -->
            <div class="nav-actions">
              <!-- Cart badge using async pipe -->
              <button class="btn-icon cart-btn" routerLink="/products" title="Cart">
                <span class="material-icons-round">shopping_cart</span>
                <span class="cart-badge" *ngIf="(cartCount$ | async)! > 0">
                  {{ cartCount$ | async }}
                </span>
              </button>

              <!-- User menu -->
              <div class="user-menu" *ngIf="currentUser$ | async as user">
                <button class="user-avatar" (click)="toggleUserMenu()" title="{{ user.firstName }}">
                  {{ user.avatar || (user.firstName[0] + user.lastName[0]) }}
                </button>
                <div class="dropdown" *ngIf="showUserMenu" (click)="showUserMenu = false">
                  <div class="dropdown-header">
                    <strong>{{ user.firstName }} {{ user.lastName }}</strong>
                    <span class="text-muted text-sm">{{ user.email }}</span>
                    <span class="badge badge-accent" style="margin-top:4px">{{ user.role }}</span>
                  </div>
                  <div class="divider"></div>
                  <a routerLink="/profile" class="dropdown-item">
                    <span class="material-icons-round">manage_accounts</span> Profile Settings
                  </a>
                  <button class="dropdown-item danger" (click)="logout()">
                    <span class="material-icons-round">logout</span> Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main content -->
      <main class="main-content" [class.no-nav]="!(isAuthenticated$ | async)">
        <router-outlet></router-outlet>
      </main>
    </div>

    <!-- Toast Notifications -->
    <div class="toast-container" *ngIf="toasts$ | async as toasts">
      <div *ngFor="let toast of toasts; trackBy: trackToast"
           class="toast" [class]="toast.type">
        <span class="material-icons-round" [style.color]="getToastColor(toast.type)">
          {{ toast.icon }}
        </span>
        <span>{{ toast.message }}</span>
        <button class="btn-icon" style="margin-left:auto;padding:4px" (click)="dismissToast(toast.id)">
          <span class="material-icons-round" style="font-size:16px!important">close</span>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  currentUser$: Observable<User | null>;
  cartCount$: Observable<number>;
  toasts$: Observable<Toast[]>;
  showUserMenu = false;
  isAuthPage = false;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.isAuthenticated$ = authService.isAuthenticated$;
    this.currentUser$ = authService.currentUser$;
    this.cartCount$ = productService.cartCount$;
    this.toasts$ = toastService.toasts$;
  }

  ngOnInit() {
    // Close dropdown on route change
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => { this.showUserMenu = false; });
  }

  toggleUserMenu(): void { this.showUserMenu = !this.showUserMenu; }
  logout(): void { this.authService.logout(); }

  // trackBy function — Interview: Why use trackBy with *ngFor?
  // Without trackBy: Angular re-creates all DOM elements on data change
  // With trackBy: Angular only updates changed elements (huge performance gain!)
  trackToast(index: number, toast: Toast): string { return toast.id; }

  getToastColor(type: string): string {
    return { success: 'var(--color-success)', error: 'var(--color-danger)', info: 'var(--color-info)' }[type] || '';
  }

  dismissToast(id: string): void { this.toastService.remove(id); }
}
