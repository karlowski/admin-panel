import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class StarterToasterService extends ToasterService {

  constructor(toastrService: ToastrService) {
    super(toastrService);
  }

  showStartSuccess(): void {
    this.showSuccess('workflow has been started');
  }

  showStartFailure(error: any): void {
    this.showError(`Error occured while starting workflow`, error);
  }
}
