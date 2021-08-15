import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export function notInYearValidator(notInYear: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const date = control.value as Date;
    return date.getFullYear() == notInYear
      ? { notInYear: { value: control.value } }
      : null;
  };
}

@Directive({
  selector: '[appNotInYear]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NotInYearValidatorDirective,
      multi: true,
    },
  ],
})
export class NotInYearValidatorDirective implements Validator {
  @Input('appNotInYear')
  notInYear?: number;

  validate(control: AbstractControl): ValidationErrors | null {
    return this.notInYear ? notInYearValidator(this.notInYear)(control) : null;
  }
}
