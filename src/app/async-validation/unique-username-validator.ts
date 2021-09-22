import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, filter, map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

// For more context see: https://stackoverflow.com/a/62662296
@Injectable({
  providedIn: 'root',
})
export class UniqueUsernameValidator implements AsyncValidator {
  constructor(private readonly userService: UserService) {}

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      filter((username) => !!username),
      delay(500),
      switchMap((username) =>
        this.userService
          .isUsernameAvailable(username)
          .pipe(
            map((available) =>
              available ? null : { uniqueUsername: { value: control.value } }
            )
          )
      )
    );
  }
}
