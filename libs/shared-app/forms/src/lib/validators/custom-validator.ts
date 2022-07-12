import {
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
  FormControl,
  FormGroup,
} from '@angular/forms';

import { isValidCron } from 'cron-validator';

export abstract class CustomValidators {
  public static URL(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    try {
      new URL(control.value);
      return null;
    } catch {
      return { invalidUrl: true };
    }
  }

  public static cronExpression(
    control: AbstractControl
  ): ValidationErrors | null {
    if (control.value && !isValidCron(control.value)) {
      return { cronExpression: true };
    }
    return null;
  }

  public static confirmPassword(
    controlName: string,
    matchingControlName: string
  ) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmPassword
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPassword: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
