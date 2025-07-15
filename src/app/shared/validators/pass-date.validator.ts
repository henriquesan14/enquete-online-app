import { AbstractControl, ValidatorFn } from "@angular/forms";

export function passDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const currentDate = new Date();
    const inputDate = new Date(control.value);

    if (control.value && inputDate < currentDate) {
      return { 'passDate': true };
    }

    return null;
  };
}