import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { capitalize } from '../models/util/text.util';
import { ActionMessages } from '../models/workflow/workflows.constants';

export class ToasterService {
  options = {
    positionClass: 'toast-top-right',
  };

  constructor(private toastr: ToastrService) {}

  showSuccess(message): void {
    this.toastr.success(message, 'success', this.options);
  }

  showError(message, error: HttpErrorResponse): void {
    const errorText = error.error?.error
      ?? error.error?.message
      ?? error.error
      ?? error;
    this.toastr.error(`${message}: ${JSON.stringify(errorText)}`, 'error', this.options);
  }

  showActionSuccess(action: string): void {
    this.showSuccess(`${capitalize(ActionMessages[action])} has been succeeded`);
  }

  showActionFailure(action: string, error: any): void {
    this.showError(`Error occured while ${ActionMessages[action]}`, error);
  }
}
