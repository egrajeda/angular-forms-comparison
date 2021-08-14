import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { SimpleForm } from 'src/app/simple-form/simple-form';
import { SimpleFormNgxsPlugin } from 'src/app/simple-form/simple-form-ngxs-plugin/simple-form-ngxs-plugin.actions';
import { SimpleFormNgxsPluginSelectors } from 'src/app/simple-form/simple-form-ngxs-plugin/simple-form-ngxs-plugin.selectors';
import { SimpleFormNgxsPluginForm } from 'src/app/simple-form/simple-form-ngxs-plugin/simple-form-ngxs-plugin.state';

@Component({
  selector: 'app-simple-form-ngxs-plugin',
  templateUrl: './simple-form-ngxs-plugin.component.html',
})
export class SimpleFormNgxsPluginComponent {
  readonly colors = ['Red', 'Green', 'Blue'];
  readonly form = this.formBuilder.group({
    name: [''],
    birthdate: [''],
    favoriteColor: [''],
  });

  @Select(SimpleFormNgxsPluginSelectors.form)
  form$!: Observable<SimpleFormNgxsPluginForm>;

  @Select(SimpleFormNgxsPluginSelectors.model)
  model$!: Observable<SimpleForm>;

  @Select(SimpleFormNgxsPluginSelectors.loading)
  loading$!: Observable<boolean>;

  get name() {
    return this.form.get('name');
  }

  get birthdate() {
    return this.form.get('birthdate');
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    this.store
      .dispatch(new SimpleFormNgxsPlugin.Submit())
      .pipe(withLatestFrom(this.model$))
      .subscribe(([, { id }]) => {
        this.snackBar.open(`Form saved with ID #${id}`, 'Close');
      });
  }
}
