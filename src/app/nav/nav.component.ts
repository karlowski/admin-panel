import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NAVIGATION_TABS } from '../shared/models/appConstants';
import { NavigationService } from '../shared/services/navigation.service';
import { UrlFilterService } from '../shared/services/urlFilterService';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  selectedTab = -1;
  tabs = NAVIGATION_TABS;

  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private urlFilterService: UrlFilterService) {
      this.selectedTab = this.navigationService.getSelectedNavigationTab();
  }

  onTabChange(e): void {
    this.urlFilterService.filterSubject.next({});
    this.router.navigate([this.tabs[e.index].link]);
  }

  onTabGroupClicked(): void{
    const selectedPath = this.tabs[this.selectedTab]?.link;
    if (this.navigationService.isOnChildPath(selectedPath)) {
      this.router.navigate([selectedPath]);
    }
  }
}
