import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-form-template',
  templateUrl: './profile-form-template.component.html',
})
export class ProfileFormTemplateComponent {
  readonly profile: Profile = {
    id: 0,
    name: '',
    wantsPet: false,
  };
  hasPet = false;
  loading = false;

  constructor(
    private readonly profileService: ProfileService,
    private readonly snackBar: MatSnackBar
  ) {}

  submit(): void {
    if (!this.hasPet) {
      this.profile.petName = undefined;
    }

    this.loading = true;
    this.profileService
      .save(this.profile)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(({ id }) => {
        this.snackBar.open(`Profile saved with ID #${id}`, 'Close');
      });
  }
}
