import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DUMMY_NAMES } from '../models/dummy';
import { ISearchQuery } from '../models/search-query.interface';

@Injectable({
  providedIn: 'root'
})
export class UrlFilterService {

  filterSubject: BehaviorSubject<ISearchQuery>;

  constructor(){
    this.filterSubject = new BehaviorSubject<ISearchQuery>(this.getWorkflowFilters());
  }

  getFilterValue(datePipe: DatePipe, activeFilter: [string, string]): string{
    switch (activeFilter[0]) {
      case 'dummy':
        return DUMMY_NAMES[activeFilter[1]];
      case 'createdStart':
      case 'createdEnd':
        const date = new Date(0);
        date.setUTCMilliseconds(Number(activeFilter[1]));
        return datePipe.transform(date, 'dd/MM/yyyy');
    }
    return activeFilter[1];
  }

  getWorkflowFilters(searchQuery?: ISearchQuery): ISearchQuery| null{
    if (searchQuery){
      return searchQuery;
    }
    const filters = window.location.href.split(';')
      .map(pair => pair.split('='))
      .filter(pair => pair.length === 2);
    if (filters.length === 0){
      return null;
    }
    const findFilter = (filterName: string) => {
      const pair = filters.find(p => p[0] === filterName);
      return pair ? pair[1] : null;
    };
    const result = {
      status: findFilter('status'),
      state: findFilter('state'),
      dummy: findFilter('dummy'),
      createdStart: findFilter('createdStart'),
      createdEnd: findFilter('createdEnd')
    };
    for (const prop in result) {
      if (!result[prop]) {
        delete result[prop];
      }
    }
    return result;
  }
}
