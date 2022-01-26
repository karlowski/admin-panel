import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { takeUntil } from 'rxjs/operators';

import { Unsubscriber } from './shared/unsubscriber.class';
import { NavigationService } from './shared/services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Unsubscriber{
  showSearchButton = false;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  spinnerWithoutBackdrop = false;
  @ViewChild('drawer') public drawer: MatDrawer;

  constructor(private navigationService: NavigationService){
    super();
    this.navigationService.searchablePage.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((pageType) => {
      this.showSearchButton = pageType !== null;
      if (this.drawer && !this.showSearchButton){
        this.drawer.close();
      }
    });
  }
}
