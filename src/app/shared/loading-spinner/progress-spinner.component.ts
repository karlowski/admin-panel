import { Component, ViewChild, TemplateRef, ViewContainerRef, OnInit, DoCheck } from '@angular/core';
import { OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { LoadingSpinnerService } from '../services/loading-spinner.service';
import { Unsubscriber } from '../unsubscriber.class';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent extends Unsubscriber implements OnInit, DoCheck {
  color: ThemePalette = 'primary';
  diameter = 60;
  spinnerWithoutBackdrop = false;
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  backdropEnabled = true;
  positionGloballyCenter = true;
  displayProgressSpinner = false;

  @ViewChild('progressSpinnerRef')
  private progressSpinnerRef: TemplateRef<any>;
  private progressSpinnerOverlayConfig: OverlayConfig;
  private overlayRef: OverlayRef;
  constructor(private vcRef: ViewContainerRef, private spinnerService: LoadingSpinnerService) {
    super();
    spinnerService.showLoading.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(loading => this.displayProgressSpinner = loading);
  }

  ngOnInit(): void {
    this.progressSpinnerOverlayConfig = {
      hasBackdrop: this.backdropEnabled
    };
    if (this.positionGloballyCenter) {
      this.progressSpinnerOverlayConfig.positionStrategy = this.spinnerService.positionGloballyCenter();
    }
    this.overlayRef = this.spinnerService.createOverlay(this.progressSpinnerOverlayConfig);
  }

  ngDoCheck(): void {
    if (this.displayProgressSpinner && !this.overlayRef.hasAttached()) {
      this.spinnerService.attachTemplatePortal(this.overlayRef, this.progressSpinnerRef, this.vcRef);
    } else if (!this.displayProgressSpinner && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}
