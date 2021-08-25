import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validCustomerIdValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const valid = /^[A-Z]{2}[0-9]{4}$/.test(control.value);
    return valid ? null : { validCustomerId: { value: control.value } };
  };
}
