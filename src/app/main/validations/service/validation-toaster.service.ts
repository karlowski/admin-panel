import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { IPatchOperation } from 'src/app/shared/models/validation/patch-operation.interface';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationToasterService extends ToasterService {
  constructor(toastrService: ToastrService) {
    super(toastrService);
  }

  showPatchSuccess(patchOperation: IPatchOperation): void {
    this.showSuccess(`field ${patchOperation?.op === 'add' ? 'added' : 'changed'} successfully`);
  }

  showFieldSavedError(fieldName: string, error: any): void {
    this.showError(`Error occured while saving field '${fieldName}'`, error);
  }
}
