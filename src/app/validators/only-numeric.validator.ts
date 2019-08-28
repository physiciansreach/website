import { AbstractControl, ValidationErrors } from '@angular/forms';

export function onlyNumericValidator(control: AbstractControl): ValidationErrors {

    if (control.value && !control.value.match(/^[0-9]*$/)) {
        return { notNumeric: true };
    }

    return undefined;
}
