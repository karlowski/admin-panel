import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Easily cancel subscriptions when component is destroyed to prevent memory leaks.
 *
 * Usage:
 * 1. Extend your component from Unsubscriber.
 * 2. Add takeUntil(this.unsubscribe) to subscriptions in your component.
 * 3. When component is destroyed, this.unsubscribe will emit a value that will cancel the subscription.
 */
@Directive()
// tslint:disable-next-line: directive-class-suffix
export class Unsubscriber implements OnDestroy {
  /**
   * Observable to pass to operators like takeUntil.
   */
  protected unsubscribe = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
