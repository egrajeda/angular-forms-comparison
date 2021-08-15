import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { User } from 'src/app/simple-form/user';
import { UserFormNgxs } from 'src/app/simple-form/user-form-ngxs/user-form-ngxs.actions';
import { UserFormNgxsSelectors } from 'src/app/simple-form/user-form-ngxs/user-form-ngxs.selectors';

@Component({
  selector: 'app-user-form-ngxs',
  templateUrl: './user-form-ngxs.component.html',
})
export class UserFormNgxsComponent {
  readonly colors = ['Red', 'Green', 'Blue'];

  @Select(UserFormNgxsSelectors.user)
  user$!: Observable<User>;

  @Select(UserFormNgxsSelectors.loading)
  loading$!: Observable<boolean>;

  constructor(
    private readonly store: Store,
    private readonly snackBar: MatSnackBar
  ) {}

  setName(name: string) {
    this.store.dispatch(new UserFormNgxs.SetName(name));
  }

  setBirthdate(birthdate: Date) {
    this.store.dispatch(new UserFormNgxs.SetBirthdate(birthdate));
  }

  setFavoriteColor(favoriteColor: string) {
    this.store.dispatch(new UserFormNgxs.SetFavoriteColor(favoriteColor));
  }

  submit(): void {
    this.store
      .dispatch(new UserFormNgxs.Submit())
      .pipe(withLatestFrom(this.user$))
      .subscribe(([, { id }]) => {
        this.snackBar.open(`User saved with ID #${id}`, 'Close');
      });
  }
}
