import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { takeUntil } from 'rxjs/operators';
import { NavigationService } from '../../services/navigation.service';
import { Unsubscriber } from '../../unsubscriber.class';

@Component({
  selector: 'app-search-sidenav',
  templateUrl: './search-sidenav.component.html',
  styleUrls: ['./search-sidenav.component.scss']
})
export class SearchSidenavComponent extends Unsubscriber implements OnInit {
  @Input() drawer: MatDrawer;

  currentPage: string;

  constructor(private navigationService: NavigationService) {
    super();
    this.navigationService.searchablePage
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(currentPage => {
        this.currentPage = currentPage;
      });
  }

  ngOnInit(): void {

  }
}
