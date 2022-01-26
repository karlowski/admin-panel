import { Injectable } from '@angular/core';

import { DEFAULT_PAGINATION } from '../models/appConstants';
import { IPagination } from '../models/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  setAndGetPagination(pagination: IPagination): IPagination {
    if (!pagination){
      pagination = {};
    }
    if (pagination.size){
      localStorage.setItem('PAGINATION_SIZE', pagination.size.toString());
    }else{
      if (localStorage.getItem('PAGINATION_SIZE')) {
        pagination.size = parseInt(localStorage.getItem('PAGINATION_SIZE'), 10);
      }else {
        pagination.size = DEFAULT_PAGINATION.size;
      }
    }

    if (pagination.sort){
      localStorage.setItem('PAGINATION_SORT', JSON.stringify(pagination.sort));
    }else if (localStorage.getItem('PAGINATION_SORT')){
      pagination.sort = JSON.parse(localStorage.getItem('PAGINATION_SORT'));
    }else {
      pagination.sort = DEFAULT_PAGINATION.sort;
    }

    if (!pagination.page){
      pagination.page = 0;
    }
    return pagination;
  }
}
