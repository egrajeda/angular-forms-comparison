import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { UniqueUsernameValidator } from '../unique-username-validator';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up-form-reactive',
  templateUrl: './sign-up-form-reactive.component.html',
})
export class SignUpFormReactiveComponent {
  readonly signUpForm = this.formBuilder.group({
    username: ['', Validators.required, [this.uniqueUsernameValidator]],
    password: ['', Validators.required],
  });
  loading = false;

  get username() {
    return this.signUpForm.get('username');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly uniqueUsernameValidator: UniqueUsernameValidator,
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar
  ) {}

  submit(): void {
    const user: User = this.signUpForm.value;

    this.loading = true;
    this.userService
      .save(user)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(({ id }) => {
        this.snackBar.open(`User saved with ID #${id}`, 'Close');
      });
  }
}
