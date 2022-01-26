import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class WorkflowToasterService extends ToasterService {

  constructor(toastrService: ToastrService) {
    super(toastrService);
  }
}
