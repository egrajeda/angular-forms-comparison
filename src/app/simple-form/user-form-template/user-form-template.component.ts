import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/simple-form/user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-form-template',
  templateUrl: './user-form-template.component.html',
})
export class UserFormTemplateComponent {
  readonly colors = ['Red', 'Green', 'Blue'];
  readonly user: User = {
    id: 0,
    name: '',
    birthdate: new Date(),
    favoriteColor: '',
  };
  loading = false;

  constructor(
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    this.loading = true;
    this.userService
      .save(this.user)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(({ id }) => {
        this.snackBar.open(`User saved with ID #${id}`, 'Close');
      });
  }
}
