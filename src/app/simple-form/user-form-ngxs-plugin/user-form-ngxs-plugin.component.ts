import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { User } from 'src/app/simple-form/user';
import { UserFormNgxsPlugin } from 'src/app/simple-form/user-form-ngxs-plugin/user-form-ngxs-plugin.actions';
import { UserFormNgxsPluginSelectors } from 'src/app/simple-form/user-form-ngxs-plugin/user-form-ngxs-plugin.selectors';
import { UserForm } from 'src/app/simple-form/user-form-ngxs-plugin/user-form-ngxs-plugin.state';

@Component({
  selector: 'app-user-form-ngxs-plugin',
  templateUrl: './user-form-ngxs-plugin.component.html',
})
export class UserFormNgxsPluginComponent {
  readonly colors = ['Red', 'Green', 'Blue'];
  readonly userForm = this.formBuilder.group({
    name: [''],
    birthdate: [''],
    favoriteColor: [''],
  });

  @Select(UserFormNgxsPluginSelectors.form)
  userFormState$!: Observable<UserForm>;

  @Select(UserFormNgxsPluginSelectors.model)
  user$!: Observable<User>;

  @Select(UserFormNgxsPluginSelectors.loading)
  loading$!: Observable<boolean>;

  get name() {
    return this.userForm.get('name');
  }

  get birthdate() {
    return this.userForm.get('birthdate');
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
    private readonly snackBar: MatSnackBar
  ) {}

  submit(): void {
    this.store
      .dispatch(new UserFormNgxsPlugin.Submit())
      .pipe(withLatestFrom(this.user$))
      .subscribe(([, { id }]) => {
        this.snackBar.open(`User saved with ID #${id}`, 'Close');
      });
  }
}
