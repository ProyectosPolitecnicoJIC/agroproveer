import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypesService {

  readonly documentTypes = [
    { value: 'CC', label: 'Cedula de ciudadania' },
    { value: 'CE', label: 'Cedula de extranjeria' },
  ]

  constructor() { }

  getDocumentTypes(): { value: string, label: string }[] {
    return this.documentTypes;
  }
}
