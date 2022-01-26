import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NAVIGATION_TABS } from '../models/appConstants';
import { Unsubscriber } from '../unsubscriber.class';

@Injectable({
  providedIn: 'root'
})
export class NavigationService extends Unsubscriber{
  searchablePage = new BehaviorSubject<string>(null);

  constructor(
    private location: Location,
    private router: Router,
    ) {
      super();
      this.toggleShowButtonByPageType();
      this.router.events
      .pipe(
        takeUntil(this.unsubscribe),
        filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.toggleShowButtonByPageType());
  }

  toggleShowButtonByPageType(): void {
    const currentPath = this.location.path();
    const searchablePageIndex = NAVIGATION_TABS.findIndex(tab => tab.searchable && currentPath.startsWith(tab.link));
    this.searchablePage.next(searchablePageIndex !== -1 ? NAVIGATION_TABS[searchablePageIndex].link : null);
  }

  getSelectedNavigationTab(): number {
    const currentPath = this.location.path();
    return NAVIGATION_TABS.findIndex(tab => currentPath.startsWith(tab.link));
  }

  isOnChildPath(parentPath: string): boolean {
    const currentPath = this.location.path();
    return parentPath
      && currentPath.startsWith(parentPath)
      && currentPath !== parentPath;
  }
}
