// ============================================
// TOAST NOTIFICATION SERVICE
// Interview Topics: Service with Subject, setTimeout cleanup
// ============================================

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  // Subject (not BehaviorSubject) — no initial value needed for notifications
  private toastSubject = new Subject<Toast[]>();
  toasts$ = this.toastSubject.asObservable();
  private toasts: Toast[] = [];

  private add(message: string, type: Toast['type'], icon: string): void {
    const toast: Toast = { id: Date.now().toString(), message, type, icon };
    this.toasts = [...this.toasts, toast];
    this.toastSubject.next(this.toasts);
    // Auto-remove after 3 seconds
    setTimeout(() => this.remove(toast.id), 3000);
  }

  success(message: string): void { this.add(message, 'success', 'check_circle'); }
  error(message: string): void { this.add(message, 'error', 'error'); }
  info(message: string): void { this.add(message, 'info', 'info'); }

  remove(id: string): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.toastSubject.next(this.toasts);
  }
}
