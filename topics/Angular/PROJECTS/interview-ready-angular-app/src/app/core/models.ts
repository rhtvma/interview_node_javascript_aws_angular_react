// ============================================
// MODELS — TypeScript Interfaces & Types
// Interview Topic: TypeScript interfaces vs classes,
// Optional properties (?), Readonly, Union types
// ============================================

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user'; // Union type
  joinedAt: Date;
  address?: Address;
  phone?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends AuthCredentials { // Interface extension
  firstName: string;
  lastName: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  brand: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  stock: number;
  tags: string[];
  isFeatured?: boolean;
}

export type ProductCategory =
  | 'Electronics'
  | 'Clothing'
  | 'Books'
  | 'Home & Garden'
  | 'Sports'
  | 'Beauty';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ApiResponse<T> { // Generic interface
  data: T;
  success: boolean;
  message?: string;
}

// ============================================
// INTERVIEW QUESTIONS — Models & TypeScript
// ============================================
/*
Q1. What is the difference between interface and type in TypeScript?
    - Interfaces support declaration merging; types don't.
    - Types can represent primitives, unions, tuples; interfaces only objects.
    - Both can be extended, but syntax differs (extends vs &).

Q2. What are generics in TypeScript? Where have you used them?
    - Generics allow creating reusable components with type parameters.
    - Example: ApiResponse<T> works for ApiResponse<User>, ApiResponse<Product[]>, etc.
    - Used in Angular: Observable<T>, HttpClient.get<T>(), EventEmitter<T>

Q3. What is the difference between 'any', 'unknown', and 'never' in TypeScript?
    - any: disables type checking (avoid!)
    - unknown: type-safe counterpart; must narrow before use
    - never: represents values that never occur (e.g., exhaustive checks, throw-only functions)

Q4. Explain Union types vs Intersection types.
    - Union (A | B): value can be A or B
    - Intersection (A & B): value must satisfy both A and B (like extending multiple interfaces)
*/
