import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up-form-template',
  templateUrl: './sign-up-form-template.component.html',
})
export class SignUpFormTemplateComponent {
  readonly user: User = {
    id: 0,
    username: '',
    password: '',
  };
  loading = false;

  constructor(
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar
  ) {}

  submit(): void {
    this.loading = true;
    this.userService
      .save(this.user)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(({ id }) => {
        this.snackBar.open(`User saved with ID #${id}`, 'Close');
      });
  }
}
