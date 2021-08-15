import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { SimpleForm } from 'src/app/simple-form/simple-form';
import { SimpleFormNgxs } from 'src/app/simple-form/simple-form-ngxs/simple-form-ngxs.actions';
import { SimpleFormNgxsSelectors } from 'src/app/simple-form/simple-form-ngxs/simple-form-ngxs.selectors';

@Component({
  selector: 'app-simple-form-ngxs',
  templateUrl: './simple-form-ngxs.component.html',
})
export class SimpleFormNgxsComponent {
  readonly colors = ['Red', 'Green', 'Blue'];

  @Select(SimpleFormNgxsSelectors.model)
  model$!: Observable<SimpleForm>;

  @Select(SimpleFormNgxsSelectors.loading)
  loading$!: Observable<boolean>;

  constructor(
    private readonly store: Store,
    private readonly snackBar: MatSnackBar
  ) {}

  setName(name: string) {
    this.store.dispatch(new SimpleFormNgxs.SetName(name));
  }

  setBirthdate(birthdate: Date) {
    this.store.dispatch(new SimpleFormNgxs.SetBirthdate(birthdate));
  }

  setFavoriteColor(favoriteColor: string) {
    this.store.dispatch(new SimpleFormNgxs.SetFavoriteColor(favoriteColor));
  }

  onSubmit(): void {
    this.store
      .dispatch(new SimpleFormNgxs.Submit())
      .pipe(withLatestFrom(this.model$))
      .subscribe(([, { id }]) => {
        this.snackBar.open(`Form saved with ID #${id}`, 'Close');
      });
  }
}
