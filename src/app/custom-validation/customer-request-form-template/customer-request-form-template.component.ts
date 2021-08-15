import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { CustomerRequest } from 'src/app/custom-validation/customer-request';
import { CustomerRequestService } from 'src/app/custom-validation/customer-request.service';

@Component({
  selector: 'app-customer-request-form-template',
  templateUrl: './customer-request-form-template.component.html',
})
export class CustomerRequestFormTemplateComponent {
  readonly customerRequest: CustomerRequest = {
    id: '',
    date: new Date(),
    message: '',
  };
  loading = false;

  constructor(
    private readonly customerRequestService: CustomerRequestService,
    private readonly snackBar: MatSnackBar
  ) {}

  submit(): void {
    this.loading = true;
    this.customerRequestService
      .save(this.customerRequest)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(({ id }) => {
        this.snackBar.open(`Customer request saved with ID #${id}`, 'Close');
      });
  }
}
