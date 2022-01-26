import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class TravellingToasterService extends ToasterService {

  constructor(toastrService: ToastrService) {
    super(toastrService);
  }

  showSuccess(message): void {
    super.showSuccess(message);
  }

  showError(message, error: HttpErrorResponse): void {
    super.showError(message, error);
  }
}
