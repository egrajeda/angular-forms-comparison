import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { User } from '../user';
import { SignUpFormNgxs } from './sign-up-form-ngxs.actions';
import { SignUpFormNgxsSelectors } from './sign-up-form-ngxs.selectors';

@Component({
  selector: 'app-sign-up-form-ngxs',
  templateUrl: './sign-up-form-ngxs.component.html',
})
export class SignUpFormNgxsComponent {
  @Select(SignUpFormNgxsSelectors.user)
  user$!: Observable<User>;

  @Select(SignUpFormNgxsSelectors.loading)
  loading$!: Observable<boolean>;

  constructor(
    private readonly store: Store,
    private readonly snackBar: MatSnackBar
  ) {}

  setUsername(username: string) {
    this.store.dispatch(new SignUpFormNgxs.SetUsername(username));
  }

  setPassword(password: string) {
    this.store.dispatch(new SignUpFormNgxs.SetPassword(password));
  }

  submit(): void {
    this.store
      .dispatch(new SignUpFormNgxs.Submit())
      .pipe(withLatestFrom(this.user$))
      .subscribe(([, { id }]) => {
        this.snackBar.open(`User saved with ID #${id}`, 'Close');
      });
  }
}
