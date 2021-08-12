import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SimpleForm } from 'src/app/simple-form/simple-form';

export interface SimpleFormSaveResponse {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class SimpleFormService {
  save(form: SimpleForm): Observable<SimpleFormSaveResponse> {
    return of({
      id: 1,
    }).pipe(delay(1000));
  }
}
