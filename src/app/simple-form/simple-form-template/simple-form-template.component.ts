import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { SimpleFormService } from 'src/app/simple-form/simple-form.service';
import { SimpleForm } from '../simple-form';

@Component({
  selector: 'app-simple-form-template',
  templateUrl: './simple-form-template.component.html',
})
export class SimpleFormTemplateComponent {
  readonly colors = ['Red', 'Green', 'Blue'];
  readonly model: SimpleForm = {
    id: 0,
    name: '',
    birthdate: new Date(),
    favoriteColor: '',
  };
  loading = false;

  constructor(private readonly simpleFormService: SimpleFormService, private readonly snackBar: MatSnackBar) {}

  onSubmit(): void {
    this.loading = true;
    this.simpleFormService
      .save(this.model)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(({ id }) => {
        this.snackBar.open(`Form saved with ID #${id}`, "Close")
      });
  }
}
