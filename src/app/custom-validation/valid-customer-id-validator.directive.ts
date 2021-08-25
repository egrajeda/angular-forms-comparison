import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export function validCustomerIdValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const valid = /^[A-Z]{2}[0-9]{4}$/.test(control.value);
    return valid ? null : { validCustomerId: { value: control.value } };
  };
}

@Directive({
  selector: '[appValidCustomerId]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidCustomerIdValidatorDirective,
      multi: true,
    },
  ],
})
export class ValidCustomerIdValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return validCustomerIdValidator()(control);
  }
}
