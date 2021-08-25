import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { CustomerRequest } from 'src/app/custom-validation/customer-request';
import { CustomerRequestFormNgxsPlugin } from 'src/app/custom-validation/customer-request-form-ngxs-plugin/customer-request-form-ngxs-plugin.actions';
import { CustomerRequestFormNgxsPluginSelectors } from 'src/app/custom-validation/customer-request-form-ngxs-plugin/customer-request-form-ngxs-plugin.selectors';
import { CustomerRequestForm } from 'src/app/custom-validation/customer-request-form-ngxs-plugin/customer-request-form-ngxs-plugin.state';
import { notInYearValidator } from 'src/app/custom-validation/not-in-year-validator.directive';
import { validCustomerIdValidator } from 'src/app/custom-validation/valid-customer-id-validator.directive';

@Component({
  selector: 'app-customer-request-form-ngxs-plugin',
  templateUrl: './customer-request-form-ngxs-plugin.component.html',
})
export class CustomerRequestFormNgxsPluginComponent {
  readonly customerRequestForm = this.formBuilder.group({
    customerId: ['', [Validators.required, validCustomerIdValidator()]],
    date: ['', [Validators.required, notInYearValidator(2020)]],
    message: ['', Validators.required],
  });

  @Select(CustomerRequestFormNgxsPluginSelectors.form)
  customerRequestFormState$!: Observable<CustomerRequestForm>;

  @Select(CustomerRequestFormNgxsPluginSelectors.model)
  customerRequest$!: Observable<CustomerRequest>;

  @Select(CustomerRequestFormNgxsPluginSelectors.loading)
  loading$!: Observable<boolean>;

  get customerId() {
    return this.customerRequestForm.get('customerId');
  }

  get date() {
    return this.customerRequestForm.get('date');
  }

  get message() {
    return this.customerRequestForm.get('message');
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
    private readonly snackBar: MatSnackBar
  ) {}

  submit(): void {
    this.store
      .dispatch(new CustomerRequestFormNgxsPlugin.Submit())
      .pipe(withLatestFrom(this.customerRequest$))
      .subscribe(([, { id }]) => {
        this.snackBar.open(`Customer request saved with ID #${id}`, 'Close');
      });
  }
}
