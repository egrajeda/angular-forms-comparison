import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/simple-form/user';
import { UserService } from 'src/app/simple-form/user.service';

@Component({
  selector: 'app-user-form-reactive',
  templateUrl: './user-form-reactive.component.html',
})
export class UserFormReactiveComponent {
  readonly colors = ['Red', 'Green', 'Blue'];
  readonly userForm = this.formBuilder.group({
    name: ['', Validators.required],
    birthdate: ['', Validators.required],
    favoriteColor: [''],
  });
  loading = false;

  get name() {
    return this.userForm.get('name');
  }

  get birthdate() {
    return this.userForm.get('birthdate');
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar
  ) {}

  submit(): void {
    const user: User = this.userForm.value;

    this.loading = true;
    this.userService
      .save(user)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(({ id }) => {
        this.snackBar.open(`User saved with ID #${id}`, 'Close');
      });
  }
}
