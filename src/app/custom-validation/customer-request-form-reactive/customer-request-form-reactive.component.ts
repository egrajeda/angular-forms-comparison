import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { CustomerRequest } from 'src/app/custom-validation/customer-request';
import { notInYearValidator } from 'src/app/custom-validation/customer-request-form-reactive/not-in-year-validator';
import { validCustomerIdValidator } from 'src/app/custom-validation/customer-request-form-reactive/valid-customer-id-validator';
import { CustomerRequestService } from 'src/app/custom-validation/customer-request.service';

@Component({
  selector: 'app-customer-request-form-reactive',
  templateUrl: './customer-request-form-reactive.component.html',
})
export class CustomerRequestFormReactiveComponent {
  readonly customerRequestForm = this.formBuilder.group({
    customerId: ['', [Validators.required, validCustomerIdValidator()]],
    date: ['', [Validators.required, notInYearValidator(2020)]],
    message: ['', Validators.required],
  });
  loading = false;

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
    private readonly customerRequestService: CustomerRequestService,
    private readonly snackBar: MatSnackBar
  ) {}

  submit(): void {
    const customerRequest: CustomerRequest = this.customerRequestForm.value;

    this.loading = true;
    this.customerRequestService
      .save(customerRequest)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(({ id }) => {
        this.snackBar.open(`Customer request saved with ID #${id}`, 'Close');
      });
  }
}
