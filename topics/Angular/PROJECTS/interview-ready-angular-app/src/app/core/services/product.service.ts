// ============================================
// PRODUCT SERVICE
// Interview Topics:
// - Service with state management using BehaviorSubject
// - RxJS operators: combineLatest, distinctUntilChanged
// - Pure computation with derived state
// ============================================

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, combineLatest } from 'rxjs';
import { delay, map, distinctUntilChanged } from 'rxjs/operators';
import { Product, ProductCategory, CartItem } from '../models';

@Injectable({ providedIn: 'root' })
export class ProductService {

  // ---- Favorites State ----
  private favoritesSubject = new BehaviorSubject<Set<string>>(this.loadFavorites());
  favorites$ = this.favoritesSubject.asObservable();

  // ---- Cart State ----
  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  cart$ = this.cartSubject.asObservable();

  // Derived state — computed from cart
  cartCount$: Observable<number> = this.cart$.pipe(
    map(items => items.reduce((sum, i) => sum + i.quantity, 0)),
    distinctUntilChanged() // Only emit when value actually changes
  );

  cartTotal$: Observable<number> = this.cart$.pipe(
    map(items => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0))
  );

  // ---- Mock Product Data ----
  private MOCK_PRODUCTS: Product[] = [
    {
      id: '1', name: 'Sony WH-1000XM5', description: 'Industry-leading noise cancelling headphones with 30hr battery. Exceptional call quality and Alexa voice control.', price: 24999, originalPrice: 34999, category: 'Electronics', brand: 'Sony', rating: 4.8, reviewCount: 2847, imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80', stock: 15, tags: ['wireless', 'noise-cancelling', 'premium'], isFeatured: true
    },
    {
      id: '2', name: 'Apple AirPods Pro (2nd Gen)', description: 'Up to 2x more Active Noise Cancellation. Adaptive Transparency. Personalized Spatial Audio.', price: 19999, originalPrice: 24999, category: 'Electronics', brand: 'Apple', rating: 4.7, reviewCount: 5612, imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&q=80', stock: 30, tags: ['wireless', 'earbuds', 'apple'], isFeatured: true
    },
    {
      id: '3', name: 'Samsung Galaxy Watch 6', description: 'Advanced health monitoring, ECG tracking, and 40hr battery. Water resistant to 5ATM.', price: 22999, originalPrice: 27999, category: 'Electronics', brand: 'Samsung', rating: 4.5, reviewCount: 1203, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', stock: 8, tags: ['smartwatch', 'health', 'fitness']
    },
    {
      id: '4', name: 'Uniqlo Ultra Light Down Jacket', description: 'Incredibly light and packable down jacket. Warm enough for cold winters, subtle enough for daily wear.', price: 3999, originalPrice: 5999, category: 'Clothing', brand: 'Uniqlo', rating: 4.6, reviewCount: 892, imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80', stock: 45, tags: ['jacket', 'winter', 'packable'], isFeatured: true
    },
    {
      id: '5', name: 'Atomic Habits', description: 'James Clear\'s guide to building good habits and breaking bad ones. Over 15 million copies sold worldwide.', price: 499, originalPrice: 799, category: 'Books', brand: 'Avery', rating: 4.9, reviewCount: 12400, imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80', stock: 200, tags: ['self-help', 'productivity', 'bestseller'], isFeatured: true
    },
    {
      id: '6', name: 'Dyson V15 Detect', description: 'Laser detects invisible dust. Scientific proof of a deep clean. Up to 60 minutes of fade-free power.', price: 52999, originalPrice: 59999, category: 'Home & Garden', brand: 'Dyson', rating: 4.7, reviewCount: 634, imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', stock: 5, tags: ['vacuum', 'cordless', 'premium']
    },
    {
      id: '7', name: 'Adidas Ultraboost 23', description: 'Boost midsole for incredible energy return. Primeknit+ upper for a sock-like fit. For runners who want it all.', price: 14999, originalPrice: 19999, category: 'Sports', brand: 'Adidas', rating: 4.6, reviewCount: 3201, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', stock: 22, tags: ['running', 'shoes', 'boost'], isFeatured: true
    },
    {
      id: '8', name: 'The Ordinary Niacinamide 10%', description: 'High-strength vitamin and mineral formula with 10% Niacinamide. Reduces blemishes and congestion.', price: 699, originalPrice: 999, category: 'Beauty', brand: 'The Ordinary', rating: 4.4, reviewCount: 7823, imageUrl: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80', stock: 150, tags: ['skincare', 'serum', 'vegan']
    },
    {
      id: '9', name: 'Kindle Paperwhite (2023)', description: '6.8" display and adjustable warm light. Waterproof. Months of battery. Holds thousands of books.', price: 13999, originalPrice: 16999, category: 'Electronics', brand: 'Amazon', rating: 4.7, reviewCount: 4512, imageUrl: 'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?w=400&q=80', stock: 40, tags: ['ereader', 'kindle', 'reading']
    },
    {
      id: '10', name: 'Levi\'s 511 Slim Jeans', description: 'Classic Levi\'s slim fit. Sits below waist. Slightly fitted through hip and thigh. Perfect for everyday wear.', price: 2999, originalPrice: 4499, category: 'Clothing', brand: 'Levi\'s', rating: 4.3, reviewCount: 5678, imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80', stock: 60, tags: ['jeans', 'denim', 'classic']
    },
    {
      id: '11', name: 'Fujifilm Instax Mini 12', description: 'Point-and-shoot instant camera with automatic exposure. Includes close-up lens attachment.', price: 6999, originalPrice: 8999, category: 'Electronics', brand: 'Fujifilm', rating: 4.5, reviewCount: 1890, imageUrl: 'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=400&q=80', stock: 18, tags: ['camera', 'instant', 'photography']
    },
    {
      id: '12', name: 'Yoga Mat Premium Cork', description: 'Natural cork surface, rubber base. Non-slip even when wet. Eco-friendly and antimicrobial.', price: 2499, originalPrice: 3999, category: 'Sports', brand: 'Liforme', rating: 4.8, reviewCount: 445, imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80', stock: 35, tags: ['yoga', 'fitness', 'eco-friendly']
    }
  ];

  getAllProducts(): Observable<Product[]> {
    return of(this.MOCK_PRODUCTS).pipe(delay(600));
  }

  getProductById(id: string): Observable<Product | undefined> {
    return of(this.MOCK_PRODUCTS.find(p => p.id === id)).pipe(delay(300));
  }

  getProductsByCategory(category: ProductCategory): Observable<Product[]> {
    return of(this.MOCK_PRODUCTS.filter(p => p.category === category)).pipe(delay(400));
  }

  getFeaturedProducts(): Observable<Product[]> {
    return of(this.MOCK_PRODUCTS.filter(p => p.isFeatured)).pipe(delay(400));
  }

  // ---- Favorites ----
  toggleFavorite(productId: string): void {
    const favs = new Set(this.favoritesSubject.value);
    if (favs.has(productId)) { favs.delete(productId); } else { favs.add(productId); }
    this.favoritesSubject.next(favs);
    this.persistFavorites(favs);
  }

  isFavorite(productId: string): boolean {
    return this.favoritesSubject.value.has(productId);
  }

  // ---- Cart ----
  addToCart(product: Product, quantity = 1): void {
    const cart = [...this.cartSubject.value];
    const existingIdx = cart.findIndex(i => i.product.id === product.id);
    if (existingIdx >= 0) {
      cart[existingIdx] = { ...cart[existingIdx], quantity: cart[existingIdx].quantity + quantity };
    } else {
      cart.push({ product, quantity });
    }
    this.cartSubject.next(cart);
    this.persistCart(cart);
  }

  removeFromCart(productId: string): void {
    const cart = this.cartSubject.value.filter(i => i.product.id !== productId);
    this.cartSubject.next(cart);
    this.persistCart(cart);
  }

  updateCartQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) { this.removeFromCart(productId); return; }
    const cart = this.cartSubject.value.map(i =>
      i.product.id === productId ? { ...i, quantity } : i
    );
    this.cartSubject.next(cart);
    this.persistCart(cart);
  }

  clearCart(): void {
    this.cartSubject.next([]);
    localStorage.removeItem('shopiq_cart');
  }

  isInCart(productId: string): boolean {
    return this.cartSubject.value.some(i => i.product.id === productId);
  }

  private persistFavorites(favs: Set<string>): void {
    localStorage.setItem('shopiq_favorites', JSON.stringify([...favs]));
  }
  private loadFavorites(): Set<string> {
    try { return new Set(JSON.parse(localStorage.getItem('shopiq_favorites') || '[]')); }
    catch { return new Set(); }
  }
  private persistCart(cart: CartItem[]): void {
    localStorage.setItem('shopiq_cart', JSON.stringify(cart));
  }
  private loadCart(): CartItem[] {
    try { return JSON.parse(localStorage.getItem('shopiq_cart') || '[]'); }
    catch { return []; }
  }
}

// ============================================
// INTERVIEW QUESTIONS — State Management & RxJS
// ============================================
/*
Q1. How would you manage state in Angular without NgRx?
    - BehaviorSubject in services (lightweight state store)
    - Signal-based state (Angular 16+)
    - Services as singletons naturally share state across components

Q2. What is combineLatest and when do you use it?
    - Combines multiple observables; emits when ANY source emits (after all emit once)
    - Use for: combining filter + search + sort for product listing
    - Example: combineLatest([products$, searchTerm$, category$])

Q3. What is distinctUntilChanged and why is it important?
    - Prevents emitting duplicate consecutive values
    - Important for performance: avoids re-renders when value hasn't changed
    - Common with FormControl.valueChanges

Q4. Explain the spread operator (...) for immutable updates.
    - Angular change detection (OnPush) relies on reference changes
    - { ...existing, newProp: value } creates a NEW object reference
    - [...array, newItem] creates a NEW array reference
    - Mutating directly (array.push()) won't trigger OnPush CD!
*/
