// ============================================
// CUSTOM PIPES
// Interview Topics: Pure vs Impure pipes, PipeTransform
// ============================================

import { Pipe, PipeTransform } from '@angular/core';

// @Pipe decorator — marks class as a pipe
// pure: true (default) — only recalculates when input reference changes
// pure: false — recalculates on every change detection cycle (expensive!)
@Pipe({ name: 'currency_inr', standalone: true, pure: true })
export class CurrencyInrPipe implements PipeTransform {
  transform(value: number, showSymbol = true): string {
    if (isNaN(value)) return '';
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
    return showSymbol ? formatted : formatted.replace('₹', '').trim();
  }
}

@Pipe({ name: 'discount', standalone: true })
export class DiscountPipe implements PipeTransform {
  transform(price: number, originalPrice: number): string {
    if (!originalPrice || originalPrice <= price) return '';
    const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
    return `${discount}% off`;
  }
}

@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 100, trail = '...'): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}

@Pipe({ name: 'stars', standalone: true })
export class StarsPipe implements PipeTransform {
  // Converts rating to star emoji string
  transform(rating: number): string {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    return '★'.repeat(full) + (half ? '☆' : '') + '☆'.repeat(5 - full - half);
  }
}

// ============================================
// INTERVIEW QUESTIONS — Pipes
// ============================================
/*
Q1. What is the difference between pure and impure pipes?
    - Pure (default): runs only when input reference changes. Cached & performant.
    - Impure: runs on EVERY change detection cycle. Use sparingly (e.g., async pipe).
    - AsyncPipe is impure — it must check the Observable every CD cycle.

Q2. When should you create a custom pipe vs a method in the template?
    - Prefer pipes: they're pure by default (memoized), reusable across components.
    - Avoid methods in templates: called on every change detection cycle.
    - Exception: when you need component context or complex logic.

Q3. What built-in pipes does Angular provide?
    - DatePipe, CurrencyPipe, DecimalPipe, PercentPipe (formatting)
    - UpperCasePipe, LowerCasePipe, TitleCasePipe (string)
    - AsyncPipe (subscribes/unsubscribes from Observable or Promise)
    - JsonPipe (debugging), KeyValuePipe (object iteration), SlicePipe

Q4. How does AsyncPipe prevent memory leaks?
    - Automatically subscribes when component initializes
    - Automatically unsubscribes when component destroys
    - Triggers change detection when new value arrives (works with OnPush!)
*/
