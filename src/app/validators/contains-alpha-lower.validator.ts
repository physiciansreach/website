import { AbstractControl, ValidationErrors } from '@angular/forms';

export function containsAlphaLowerValidator(control: AbstractControl): ValidationErrors {

    if (control.value && !control.value.match(/[a-z]/)) {
        return { missingLowerAlpha: true };
    }

    return undefined;
}
