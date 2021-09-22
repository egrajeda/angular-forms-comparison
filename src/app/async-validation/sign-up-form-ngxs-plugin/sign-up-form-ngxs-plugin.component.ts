import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { UniqueUsernameValidator } from '../unique-username-validator';
import { User } from '../user';
import { SignUpFormNgxsPlugin } from './sign-up-form-ngxs-plugin.actions';
import { SignUpForm } from './sign-up-form-ngxs-plugin.state';
import { SignUpFormNgxsPluginSelectors } from './sign-up-form-ngxs-plugin.selectors';

@Component({
  selector: 'app-sign-up-form-ngxs-plugin',
  templateUrl: './sign-up-form-ngxs-plugin.component.html',
})
export class SignUpFormNgxsPluginComponent {
  readonly signUpForm = this.formBuilder.group({
    username: ['', Validators.required, [this.uniqueUsernameValidator]],
    password: ['', Validators.required],
  });
  loading = false;

  @Select(SignUpFormNgxsPluginSelectors.form)
  signUpFormState$!: Observable<SignUpForm>;

  @Select(SignUpFormNgxsPluginSelectors.model)
  user$!: Observable<User>;

  @Select(SignUpFormNgxsPluginSelectors.loading)
  loading$!: Observable<boolean>;

  get username() {
    return this.signUpForm.get('username');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly uniqueUsernameValidator: UniqueUsernameValidator,
    private readonly store: Store,
    private readonly snackBar: MatSnackBar
  ) {}

  submit(): void {
    this.store
      .dispatch(new SignUpFormNgxsPlugin.Submit())
      .pipe(withLatestFrom(this.user$))
      .subscribe(([, { id }]) => {
        this.snackBar.open(`User saved with ID #${id}`, 'Close');
      });
  }
}
