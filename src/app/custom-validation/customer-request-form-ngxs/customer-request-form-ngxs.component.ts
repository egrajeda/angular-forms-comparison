import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { CustomerRequest } from 'src/app/custom-validation/customer-request';
import { CustomerRequestFormNgxs } from 'src/app/custom-validation/customer-request-form-ngxs/customer-request-form-ngxs.actions';
import { CustomerRequestFormNgxsSelectors } from 'src/app/custom-validation/customer-request-form-ngxs/customer-request-form-ngxs.selectors';

@Component({
  selector: 'app-customer-request-form-ngxs',
  templateUrl: './customer-request-form-ngxs.component.html',
})
export class CustomerRequestFormNgxsComponent {
  @Select(CustomerRequestFormNgxsSelectors.customerRequest)
  customerRequest$!: Observable<CustomerRequest>;

  @Select(CustomerRequestFormNgxsSelectors.loading)
  loading$!: Observable<boolean>;

  constructor(
    private readonly store: Store,
    private readonly snackBar: MatSnackBar
  ) {}

  setCustomerId(customerId: string) {
    this.store.dispatch(new CustomerRequestFormNgxs.SetCustomerId(customerId));
  }

  setDate(date: Date) {
    this.store.dispatch(new CustomerRequestFormNgxs.SetDate(date));
  }

  setMessage(message: string) {
    this.store.dispatch(new CustomerRequestFormNgxs.SetMessage(message));
  }

  submit(): void {
    this.store
      .dispatch(new CustomerRequestFormNgxs.Submit())
      .pipe(withLatestFrom(this.customerRequest$))
      .subscribe(([, { id }]) => {
        this.snackBar.open(`Customer request saved with ID #${id}`, 'Close');
      });
  }
}
