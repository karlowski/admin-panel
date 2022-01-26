import { Injectable } from '@angular/core';

import { IPagination } from '../models/pagination.interface';
import { DEFAULT_PAGINATION } from '../models/appConstants';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  setAndGetPagination(pagination: IPagination): IPagination {
    if (pagination){
      localStorage.setItem('PAGINATION_SIZE', pagination.size.toString());
      return pagination;
    }
    const pageSize =  localStorage.getItem('PAGINATION_SIZE');
    if (pageSize) {
      pagination = {
        size: pageSize
      };
      return pagination;
    }
    localStorage.setItem('PAGINATION_SIZE', JSON.stringify(DEFAULT_PAGINATION.size));
    return DEFAULT_PAGINATION;
  }
}
