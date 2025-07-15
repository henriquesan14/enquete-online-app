import { AbstractControl, ValidationErrors } from '@angular/forms';

export function todasOpcoesPreenchidasValidator(control: AbstractControl): ValidationErrors | null {
  const formArray = control as any;
  if (!formArray.controls || !Array.isArray(formArray.controls)) return null;

  const temVazia = formArray.controls.some(
    (c: AbstractControl) => !c.value || c.value.trim() === ''
  );

  return temVazia ? { opcaoVazia: true } : null;
}