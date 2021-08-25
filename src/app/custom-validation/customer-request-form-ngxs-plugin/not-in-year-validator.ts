import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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
