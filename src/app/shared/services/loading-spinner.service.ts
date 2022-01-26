import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {

  showLoading = new BehaviorSubject<boolean>(false);
  constructor(
      private overlay: Overlay
  ) { }

  createOverlay(config: OverlayConfig): OverlayRef {
      return this.overlay.create(config);
  }

  attachTemplatePortal(overlayRef: OverlayRef, templateRef: TemplateRef<any>, vcRef: ViewContainerRef): void {
      const templatePortal = new TemplatePortal(templateRef, vcRef);
      overlayRef.attach(templatePortal);
  }

  positionGloballyCenter(): PositionStrategy {
      return this.overlay.position()
          .global()
          .centerHorizontally()
          .centerVertically();
  }

  enable(): void {
    this.showLoading.next(true);
  }

  disable(): void {
    this.showLoading.next(false);
  }
}
