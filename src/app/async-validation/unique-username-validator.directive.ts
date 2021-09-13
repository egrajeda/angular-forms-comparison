import { Directive, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { UserService } from './user.service';

// For more context see: https://mobiarch.wordpress.com/2017/12/26/angular-async-validator/
@Directive({
  selector: '[appUniqueUsername]',
})
export class UniqueUsernameValidatorDirective implements OnDestroy {
  private readonly subscription?: Subscription;

  constructor(userService: UserService, { control }: NgModel) {
    this.subscription = control.valueChanges
      .pipe(
        // If you filter out empty strings, you cannot use distinctUntilChanged() later
        filter((username) => !!username),
        tap(() => control.markAsPending()),
        debounceTime(500),
        switchMap((username) => userService.isUsernameAvailable(username))
      )
      .subscribe((available) => {
        if (!control.value || available) {
          // This is needed to report the validation is not pending anymore
          return control.setErrors(control.errors);
        }
        control.setErrors({
          ...control.errors,
          uniqueUsername: { value: control.value },
        });
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
