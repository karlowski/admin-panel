import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../shared/services/api.service';
import { LabelingNewDocument } from 'src/app/shared/models/validation/labeling/field';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends ApiService{

  constructor(protected injector: Injector) {
    super(injector);
  }

  uploadDocument(parameters: LabelingNewDocument, file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return super.postWithFormData(`document`, formData, {
      params: parameters,
      responseType: 'text'
    });
  }

  replaceDocument(documentId: string, file: File): Observable<void> {
    return super.put(`document/${documentId}`, file, {
      headers: new HttpHeaders({ 'Content-Type':  'multipart/form-data'})
    });
  }
}
