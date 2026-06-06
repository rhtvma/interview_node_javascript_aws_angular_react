// ============================================
// CUSTOM DIRECTIVES
// Interview Topics: Attribute vs Structural directives,
// HostListener, HostBinding, ElementRef, Renderer2
// ============================================

import {
  Directive, Input, HostListener, HostBinding,
  ElementRef, Renderer2, OnInit, OnDestroy, OnChanges,
  SimpleChanges, Output, EventEmitter
} from '@angular/core';

// ---- ATTRIBUTE DIRECTIVE ----
// Enhances existing element appearance/behavior without changing DOM structure
@Directive({
  selector: '[appHighlight]',  // Applied as attribute: <div appHighlight>
  standalone: true
})
export class HighlightDirective {
  @Input('appHighlight') highlightColor = 'rgba(232,197,71,0.1)';
  @Input() defaultColor = 'transparent';

  // HostBinding: binds to host element's property
  @HostBinding('style.backgroundColor') bgColor = this.defaultColor;
  @HostBinding('style.transition') transition = 'background-color 200ms ease';

  // HostListener: listens to host element events
  @HostListener('mouseenter') onEnter() { this.bgColor = this.highlightColor; }
  @HostListener('mouseleave') onLeave() { this.bgColor = this.defaultColor; }
}

// ---- RIPPLE DIRECTIVE ----
// Uses ElementRef + Renderer2 to manipulate DOM safely
@Directive({
  selector: '[appRipple]',
  standalone: true
})
export class RippleDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Renderer2: safe DOM manipulation (works in SSR, Web Workers)
    // Never use el.nativeElement.style directly — breaks SSR
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const el = this.el.nativeElement;
    const rect = el.getBoundingClientRect();
    const ripple = this.renderer.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    this.renderer.setStyle(ripple, 'cssText', `
      position:absolute; width:${size}px; height:${size}px;
      left:${x}px; top:${y}px; border-radius:50%;
      background:rgba(255,255,255,0.15); transform:scale(0);
      animation:ripple 600ms ease-out; pointer-events:none;
    `);
    this.renderer.appendChild(el, ripple);
    setTimeout(() => this.renderer.removeChild(el, ripple), 700);
  }
}

// ---- LAZY IMAGE LOADING DIRECTIVE ----
// Uses IntersectionObserver API for performance
@Directive({
  selector: 'img[appLazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements OnInit, OnDestroy {
  @Input('appLazyLoad') src!: string;
  @HostBinding('src') imgSrc = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22/%3E'; // placeholder

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.imgSrc = this.src;
        this.observer.disconnect();
      }
    }, { threshold: 0.1 });
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() { this.observer?.disconnect(); }
}

// ---- CLICK OUTSIDE DIRECTIVE ----
// Useful for dropdowns, modals
@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.clickOutside.emit();
    }
  }

  constructor(private el: ElementRef) {}
}

// ============================================
// INTERVIEW QUESTIONS — Directives
// ============================================
/*
Q1. What is the difference between Attribute and Structural directives?
    - Attribute: change appearance/behavior of existing element (appHighlight, ngClass, ngStyle)
    - Structural: change DOM structure — add/remove/move elements (* prefix, ngIf, ngFor, ngSwitch)
    - Structural directives use ViewContainerRef + TemplateRef under the hood

Q2. What is the difference between ElementRef and Renderer2?
    - ElementRef: direct access to DOM element. Simple but breaks SSR and Web Workers.
    - Renderer2: abstraction layer. Works in any platform (browser, SSR, Web Workers).
    - Best practice: always prefer Renderer2 for DOM manipulation.

Q3. What is HostListener vs addEventListener?
    - HostListener: Angular-managed, cleaned up automatically on destroy
    - addEventListener: manual management required, risk of memory leaks
    - HostListener works with Angular's zone.js (triggers change detection)

Q4. How do you create a structural directive like *ngIf?
    - Inject ViewContainerRef and TemplateRef
    - Use viewContainerRef.createEmbeddedView(templateRef) to show
    - Use viewContainerRef.clear() to remove
    - The * syntax is syntactic sugar for <ng-template [directive]>

Q5. What is the difference between @HostBinding and @HostListener?
    - @HostBinding: binds component/directive property to host element property/attribute
    - @HostListener: listens to host element events
    - Both can also be defined in the @Component/@Directive host metadata object (modern way)
*/
