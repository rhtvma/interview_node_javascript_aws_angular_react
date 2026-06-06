// ============================================
// DASHBOARD COMPONENT
// Interview Topics:
// - OnInit, OnDestroy lifecycle hooks
// - Subscription management & takeUntil pattern
// - ChangeDetectionStrategy.OnPush
// - combineLatest for multiple streams
// ============================================

import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { ProductService } from '../../core/services/product.service';
import { CurrencyInrPipe } from '../../shared/pipes/custom.pipes';
import { Product, User, CartItem } from '../../core/models';

// ChangeDetectionStrategy.OnPush — HUGE performance optimization
// Only re-renders when:
// 1. Input reference changes (@Input)
// 2. An event happens in the component
// 3. Observable emits via async pipe
// 4. ChangeDetectorRef.markForCheck() is called
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyInrPipe],
  changeDetection: ChangeDetectionStrategy.OnPush, // Performance boost!
  template: `
    <div class="dashboard page-enter">
      <div class="container">
        <!-- Hero greeting -->
        <header class="dashboard-header">
          <div>
            <p class="greeting-time">{{ getTimeGreeting() }}</p>
            <h1 class="greeting">{{ user?.firstName }} <span class="text-accent">{{ user?.lastName }}</span></h1>
            <p class="greeting-sub">Here's your shopping summary for today</p>
          </div>
          <div class="header-actions">
            <a routerLink="/products" class="btn btn-primary">
              <span class="material-icons-round">storefront</span>
              Browse Products
            </a>
          </div>
        </header>

        <!-- Stats cards -->
        <section class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(232,197,71,0.15); color: var(--color-accent)">
              <span class="material-icons-round">favorite</span>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ favCount }}</span>
              <span class="stat-label">Saved Items</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(76,175,131,0.15); color: var(--color-success)">
              <span class="material-icons-round">shopping_cart</span>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ cartItemCount }}</span>
              <span class="stat-label">Cart Items</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(91,155,213,0.15); color: var(--color-info)">
              <span class="material-icons-round">payments</span>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ cartTotal | currency_inr }}</span>
              <span class="stat-label">Cart Value</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(224,87,87,0.15); color: var(--color-danger)">
              <span class="material-icons-round">local_fire_department</span>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ featuredCount }}</span>
              <span class="stat-label">Trending Now</span>
            </div>
          </div>
        </section>

        <div class="dashboard-body">
          <!-- Featured Products -->
          <section class="featured-section">
            <div class="section-header">
              <h2>Featured Products</h2>
              <a routerLink="/products" class="btn btn-ghost btn-sm">View All →</a>
            </div>

            <!-- Loading skeleton -->
            <div class="featured-grid" *ngIf="loading">
              <div class="skeleton-card" *ngFor="let i of [1,2,3,4]">
                <div class="skeleton" style="height: 180px; border-radius: 12px 12px 0 0;"></div>
                <div style="padding: 16px; display:flex; flex-direction:column; gap:8px">
                  <div class="skeleton" style="height:14px; width:60%;"></div>
                  <div class="skeleton" style="height:20px; width:80%;"></div>
                  <div class="skeleton" style="height:14px; width:40%;"></div>
                </div>
              </div>
            </div>

            <div class="featured-grid" *ngIf="!loading">
              <div class="product-mini-card" *ngFor="let product of featuredProducts; trackBy: trackProduct">
                <div class="mini-card-img">
                  <img [src]="product.imageUrl" [alt]="product.name" loading="lazy">
                  <button class="fav-btn" [class.active]="isFav(product.id)"
                          (click)="toggleFav(product.id, $event)">
                    <span class="material-icons-round">{{ isFav(product.id) ? 'favorite' : 'favorite_border' }}</span>
                  </button>
                </div>
                <div class="mini-card-body">
                  <span class="text-xs text-muted">{{ product.brand }}</span>
                  <p class="mini-card-name">{{ product.name }}</p>
                  <div class="mini-card-footer">
                    <span class="mini-price">{{ product.price | currency_inr }}</span>
                    <button class="btn btn-primary btn-sm" (click)="addToCart(product)">
                      <span class="material-icons-round" style="font-size:16px!important">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Cart Sidebar -->
          <aside class="cart-panel">
            <h2>My Cart</h2>
            <div class="cart-empty" *ngIf="cartItems.length === 0">
              <span class="material-icons-round" style="font-size:48px!important;color:var(--color-text-dim)">shopping_cart</span>
              <p>Your cart is empty</p>
              <a routerLink="/products" class="btn btn-secondary btn-sm">Start Shopping</a>
            </div>
            <div class="cart-list" *ngIf="cartItems.length > 0">
              <div class="cart-item" *ngFor="let item of cartItems; trackBy: trackCartItem">
                <img [src]="item.product.imageUrl" [alt]="item.product.name" class="cart-item-img">
                <div class="cart-item-info">
                  <p class="cart-item-name">{{ item.product.name }}</p>
                  <span class="text-muted text-sm">Qty: {{ item.quantity }}</span>
                </div>
                <span class="cart-item-price">{{ item.product.price * item.quantity | currency_inr }}</span>
                <button class="btn-icon" style="padding:4px" (click)="removeFromCart(item.product.id)">
                  <span class="material-icons-round" style="font-size:16px!important;color:var(--color-danger)">delete</span>
                </button>
              </div>
              <div class="cart-total">
                <span>Total</span>
                <strong>{{ cartTotal | currency_inr }}</strong>
              </div>
              <button class="btn btn-primary w-full" style="justify-content:center">
                <span class="material-icons-round">payment</span>
                Checkout
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: User | null = null;
  featuredProducts: Product[] = [];
  cartItems: CartItem[] = [];
  cartTotal = 0;
  cartItemCount = 0;
  favCount = 0;
  featuredCount = 0;
  loading = true;

  // Subject used with takeUntil for subscription cleanup
  // Interview: Why takeUntil? Prevents memory leaks by auto-unsubscribing on destroy
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private cdr: ChangeDetectorRef // Needed with OnPush to trigger re-render manually
  ) {}

  ngOnInit(): void {
    // combineLatest — emits when ALL sources have emitted at least once,
    // then emits on every subsequent emission from any source
    combineLatest([
      this.authService.currentUser$,
      this.productService.cart$,
      this.productService.favorites$,
      this.productService.cartTotal$
    ])
    .pipe(takeUntil(this.destroy$)) // Auto-unsubscribe on component destroy
    .subscribe(([user, cart, favs, total]) => {
      this.user = user;
      this.cartItems = cart;
      this.cartTotal = total;
      this.cartItemCount = cart.reduce((sum, i) => sum + i.quantity, 0);
      this.favCount = favs.size;
      this.cdr.markForCheck(); // Trigger OnPush change detection
    });

    // Load featured products
    this.productService.getFeaturedProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => {
        this.featuredProducts = products;
        this.featuredCount = products.length;
        this.loading = false;
        this.cdr.markForCheck();
      });
  }

  // ngOnDestroy: cleanup lifecycle hook
  // Always implement when using subscriptions, timers, event listeners
  ngOnDestroy(): void {
    this.destroy$.next();    // Signal to takeUntil
    this.destroy$.complete(); // Clean up the Subject itself
  }

  getTimeGreeting(): string {
    const h = new Date().getHours();
    if (h < 12) return '🌅 Good morning';
    if (h < 17) return '☀️ Good afternoon';
    return '🌙 Good evening';
  }

  isFav(id: string): boolean { return this.productService.isFavorite(id); }
  toggleFav(id: string, event: Event): void {
    event.stopPropagation();
    this.productService.toggleFavorite(id);
  }

  addToCart(product: Product): void {
    this.productService.addToCart(product);
  }

  removeFromCart(id: string): void { this.productService.removeFromCart(id); }

  // trackBy for *ngFor performance
  trackProduct(index: number, product: Product): string { return product.id; }
  trackCartItem(index: number, item: CartItem): string { return item.product.id; }
}

// ============================================
// INTERVIEW QUESTIONS — Change Detection & Lifecycle
// ============================================
/*
Q1. What are Angular lifecycle hooks in order?
    ngOnChanges → ngOnInit → ngDoCheck → ngAfterContentInit →
    ngAfterContentChecked → ngAfterViewInit → ngAfterViewChecked → ngOnDestroy
    
    Most commonly used: ngOnInit (setup), ngOnChanges (react to input changes),
    ngOnDestroy (cleanup), ngAfterViewInit (access ViewChild after render)

Q2. What is ChangeDetectionStrategy.OnPush?
    - Default: Angular checks every component on EVERY change detection cycle
    - OnPush: only checks when Input reference changes, events fire, or async pipe emits
    - Dramatically reduces unnecessary re-renders in large apps
    - Use markForCheck() when updating state outside Angular's zone

Q3. How do you prevent memory leaks in Angular?
    - Unsubscribe in ngOnDestroy (manual, easy to forget)
    - takeUntil(destroy$) pattern (recommended, clean)
    - async pipe (auto-unsubscribes!)
    - take(1) for one-time subscriptions

Q4. What is the difference between ngOnInit and constructor?
    - Constructor: dependency injection, minimal logic
    - ngOnInit: component initialization, data fetching, subscriptions
    - @Input() values are NOT available in constructor; use ngOnInit or ngOnChanges
*/
