import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { SimpleForm } from 'src/app/simple-form/simple-form';
import { SimpleFormService } from 'src/app/simple-form/simple-form.service';

@Component({
  selector: 'app-simple-form-reactive',
  templateUrl: './simple-form-reactive.component.html',
})
export class SimpleFormReactiveComponent {
  readonly colors = ['Red', 'Green', 'Blue'];
  readonly form = this.formBuilder.group({
    name: [''],
    birthdate: [''],
    favoriteColor: [''],
  });
  loading = false;

  get name() {
    return this.form.get('name');
  }

  get birthdate() {
    return this.form.get('birthdate');
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly simpleFormService: SimpleFormService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    const model: SimpleForm = this.form.value;

    this.loading = true;
    this.simpleFormService
      .save(model)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(({ id }) => {
        this.snackBar.open(`Form saved with ID #${id}`, 'Close');
      });
  }
}
