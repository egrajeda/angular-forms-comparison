import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CustomerRequest } from 'src/app/custom-validation/customer-request';

export interface CustomerRequestSaveResponse {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerRequestService {
  save(
    customerRequest: CustomerRequest
  ): Observable<CustomerRequestSaveResponse> {
    console.log('Save:', customerRequest);
    return of({
      id: 1,
    }).pipe(delay(1000));
  }
}
