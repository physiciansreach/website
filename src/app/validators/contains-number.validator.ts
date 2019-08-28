import { AbstractControl, ValidationErrors } from '@angular/forms';

export function containsNumberValidator(control: AbstractControl): ValidationErrors {

    if (control.value && !control.value.match(/[0-9]/)) {
        return { missingNumber: true };
    }

    return undefined;
}
