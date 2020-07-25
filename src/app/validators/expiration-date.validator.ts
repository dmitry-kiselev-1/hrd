import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export function expirationDateValidator(maxDays: number = 30): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} | null => {

    if (!control.value) { return null; }

    const currentDate = moment();
    const expirationDate = moment(control.value);
    const minExpirationDate = currentDate.clone().add(maxDays, 'day');

    const isValid = expirationDate >= minExpirationDate;

    return !isValid && control.value
      ? {expirationDate: {value: 'Expiration Date close than 30 days'}}
      : null;
  };
}
