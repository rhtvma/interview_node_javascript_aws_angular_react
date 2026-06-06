// ============================================
// PRODUCTS COMPONENT
// Interview Topics:
// - ViewChild, ContentChild
// - Signal inputs (Angular 17+)
// - Two-way binding with ngModel
// - Filtering with combineLatest + BehaviorSubject
// - @Input/@Output with EventEmitter
// ============================================

import {
  Component, OnInit, OnDestroy, ViewChild, ElementRef,
  ChangeDetectionStrategy, ChangeDetectorRef, signal, computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductService } from '../../core/services/product.service';
import { ToastService } from '../../core/services/toast.service';
import { CurrencyInrPipe, DiscountPipe, TruncatePipe } from '../../shared/pipes/custom.pipes';
import { HighlightDirective, RippleDirective } from '../../shared/directives/custom.directives';
import { Product, ProductCategory } from '../../core/models';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'name';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyInrPipe, DiscountPipe, TruncatePipe, HighlightDirective, RippleDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="products-page page-enter">
      <div class="container">
        <!-- Page header -->
        <header class="page-header">
          <div>
            <h1>Product Catalogue</h1>
            <p class="text-muted">{{ filteredProducts().length }} products found</p>
          </div>
          <!-- View toggle -->
          <div class="view-toggle">
            <button class="btn-icon" [class.active]="viewMode === 'grid'"
                    (click)="viewMode = 'grid'" title="Grid view">
              <span class="material-icons-round">grid_view</span>
            </button>
            <button class="btn-icon" [class.active]="viewMode === 'list'"
                    (click)="viewMode = 'list'" title="List view">
              <span class="material-icons-round">view_list</span>
            </button>
          </div>
        </header>

        <!-- Toolbar -->
        <div class="toolbar">
          <!-- Search — ViewChild reference to input element -->
          <div class="search-box">
            <span class="material-icons-round search-icon">search</span>
            <input
              #searchInput
              type="text"
              [(ngModel)]="searchTerm"
              (ngModelChange)="onSearchChange($event)"
              placeholder="Search products, brands..."
              class="search-input"
            >
            <button class="search-clear" *ngIf="searchTerm" (click)="clearSearch()">
              <span class="material-icons-round">close</span>
            </button>
          </div>

          <!-- Category filters -->
          <div class="category-filters">
            <button
              *ngFor="let cat of categories"
              class="cat-btn"
              [class.active]="selectedCategory === cat"
              (click)="selectCategory(cat)"
            >{{ cat }}</button>
          </div>

          <!-- Sort -->
          <select class="sort-select" [(ngModel)]="sortOption" (ngModelChange)="applySort($event)">
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">A → Z</option>
          </select>
        </div>

        <!-- Loading state using Signals (Angular 17+) -->
        <div class="products-loading" *ngIf="isLoading()">
          <div class="loading-grid">
            <div class="product-skeleton" *ngFor="let i of [1,2,3,4,5,6,7,8]">
              <div class="skeleton" style="height:220px;border-radius:12px 12px 0 0"></div>
              <div style="padding:16px;display:flex;flex-direction:column;gap:8px">
                <div class="skeleton" style="height:12px;width:50%"></div>
                <div class="skeleton" style="height:18px;width:75%"></div>
                <div class="skeleton" style="height:12px;width:60%"></div>
                <div class="skeleton" style="height:36px;margin-top:8px"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div class="empty-state" *ngIf="!isLoading() && filteredProducts().length === 0">
          <span class="material-icons-round" style="font-size:64px!important;color:var(--color-text-dim)">search_off</span>
          <h3>No products found</h3>
          <p>Try adjusting your search or filters</p>
          <button class="btn btn-secondary" (click)="resetFilters()">Clear Filters</button>
        </div>

        <!-- Product Grid -->
        <div
          class="products-grid"
          [class.list-view]="viewMode === 'list'"
          *ngIf="!isLoading() && filteredProducts().length > 0"
        >
          <!-- appHighlight = custom attribute directive, appRipple = custom DOM directive -->
          <article
            class="product-card"
            *ngFor="let product of filteredProducts(); trackBy: trackProduct"
            [appHighlight]="'rgba(232,197,71,0.05)'"
            appRipple
          >
            <!-- Badge -->
            <div class="card-badges">
              <span class="badge badge-danger" *ngIf="product.originalPrice">
                {{ product.price | discount: product.originalPrice! }}
              </span>
              <span class="badge badge-accent" *ngIf="product.isFeatured">Featured</span>
            </div>

            <!-- Image -->
            <div class="card-image">
              <img [src]="product.imageUrl" [alt]="product.name" loading="lazy">
              <!-- Hover actions -->
              <div class="card-overlay">
                <button class="overlay-btn" [class.active]="isFav(product.id)"
                        (click)="toggleFav(product.id, $event)" title="Wishlist">
                  <span class="material-icons-round">{{ isFav(product.id) ? 'favorite' : 'favorite_border' }}</span>
                </button>
              </div>
            </div>

            <!-- Body -->
            <div class="card-body">
              <div class="card-meta">
                <span class="product-brand">{{ product.brand }}</span>
                <span class="product-category">{{ product.category }}</span>
              </div>
              <h3 class="product-name">{{ product.name | truncate: 50 }}</h3>
              <p class="product-desc" *ngIf="viewMode === 'list'">{{ product.description | truncate: 120 }}</p>

              <!-- Rating -->
              <div class="rating-row">
                <div class="stars">
                  <span *ngFor="let s of getStars(product.rating)" [style.color]="s === 'full' ? '#e8c547' : '#444'">★</span>
                </div>
                <span class="text-muted text-xs">({{ product.reviewCount | number }})</span>
              </div>

              <!-- Price -->
              <div class="price-row">
                <div class="prices">
                  <span class="price-current">{{ product.price | currency_inr }}</span>
                  <span class="price-original" *ngIf="product.originalPrice">
                    {{ product.originalPrice | currency_inr }}
                  </span>
                </div>
                <span class="stock-badge" [class.low]="product.stock < 10">
                  {{ product.stock < 10 ? product.stock + ' left' : 'In stock' }}
                </span>
              </div>

              <!-- Actions -->
              <div class="card-actions">
                <button
                  class="btn btn-primary add-cart-btn"
                  [class.in-cart]="inCart(product.id)"
                  (click)="addToCart(product)"
                >
                  <span class="material-icons-round">{{ inCart(product.id) ? 'shopping_cart' : 'add_shopping_cart' }}</span>
                  <span>{{ inCart(product.id) ? 'Added' : 'Add to Cart' }}</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  // Angular Signals (Angular 17+) — reactive primitives, synchronous, no RxJS needed
  // Interview: Signals vs Observables?
  // Signals: synchronous, simpler, fine-grained reactivity for component state
  // Observables: async, powerful operators, better for streams/HTTP
  isLoading = signal(true);
  private allProducts = signal<Product[]>([]);

  // computed() — derived signal, auto-updates when dependencies change
  filteredProducts = computed(() => {
    let products = this.allProducts();
    const search = this.searchTerm.toLowerCase();
    const cat = this.selectedCategory;
    const sort = this.sortOption;

    if (search) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }
    if (cat !== 'All') {
      products = products.filter(p => p.category === cat);
    }
    return this.sortProducts(products, sort);
  });

  viewMode: 'grid' | 'list' = 'grid';
  searchTerm = '';
  selectedCategory: ProductCategory | 'All' = 'All';
  sortOption: SortOption = 'default';

  categories: Array<ProductCategory | 'All'> = [
    'All', 'Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Beauty'
  ];

  // ViewChild — access DOM element or child component
  // Interview: ViewChild vs ContentChild?
  // ViewChild: in component's own template
  // ContentChild: in content projected via <ng-content>
  @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>;

  private searchSubject = new BehaviorSubject<string>('');
  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => {
        this.allProducts.set(products);
        this.isLoading.set(false);
        this.cdr.markForCheck();
      });

    // Debounce search — wait 300ms after user stops typing before filtering
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(term => {
      this.searchTerm = term;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }

  onSearchChange(term: string): void { this.searchSubject.next(term); }
  clearSearch(): void { this.searchTerm = ''; this.searchSubject.next(''); }
  selectCategory(cat: ProductCategory | 'All'): void { this.selectedCategory = cat; }
  applySort(option: SortOption): void { this.sortOption = option; }
  resetFilters(): void { this.searchTerm = ''; this.selectedCategory = 'All'; this.sortOption = 'default'; }

  private sortProducts(products: Product[], sort: SortOption): Product[] {
    const p = [...products];
    switch (sort) {
      case 'price-asc': return p.sort((a, b) => a.price - b.price);
      case 'price-desc': return p.sort((a, b) => b.price - a.price);
      case 'rating': return p.sort((a, b) => b.rating - a.rating);
      case 'name': return p.sort((a, b) => a.name.localeCompare(b.name));
      default: return p.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }

  isFav(id: string): boolean { return this.productService.isFavorite(id); }
  inCart(id: string): boolean { return this.productService.isInCart(id); }

  toggleFav(id: string, event: Event): void {
    event.stopPropagation();
    this.productService.toggleFavorite(id);
    this.toastService.info(this.isFav(id) ? 'Added to wishlist ♥' : 'Removed from wishlist');
    this.cdr.markForCheck();
  }

  addToCart(product: Product): void {
    this.productService.addToCart(product);
    this.toastService.success(`${product.name} added to cart!`);
    this.cdr.markForCheck();
  }

  getStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.floor(rating) ? 'full' : 'empty');
  }

  trackProduct(index: number, product: Product): string { return product.id; }
}

// ============================================
// INTERVIEW QUESTIONS — Signals, ViewChild, Optimization
// ============================================
/*
Q1. What are Angular Signals and how do they differ from RxJS?
    - Signals: synchronous, fine-grained reactivity, no subscription management
    - signal(): creates a writable signal
    - computed(): creates a read-only derived signal (memoized)
    - effect(): side effects when signals change
    - Signals integrate with change detection — no markForCheck() needed!
    - RxJS: async, powerful operators, better for event streams, HTTP, multi-value

Q2. What is ViewChild and when do you use it?
    - Access a child component, directive, or DOM element in parent template
    - Available after ngAfterViewInit lifecycle hook
    - { static: true }: resolved at compile time (for use in ngOnInit)
    - { static: false }: resolved after view initialized (default)

Q3. What is the difference between debounceTime and throttleTime?
    - debounceTime(300): waits 300ms after LAST emission before emitting
    - throttleTime(300): emits first value, ignores for next 300ms
    - debounceTime: ideal for search input (wait until user stops typing)
    - throttleTime: ideal for scroll/resize events (limit frequency)

Q4. What is trackBy and why is it critical for performance?
    - Tells Angular how to identify items in *ngFor
    - Without trackBy: ANY data change destroys and re-creates ALL DOM elements
    - With trackBy: Angular only updates changed items by identity (id)
    - For large lists, trackBy can mean 10x performance improvement
*/
