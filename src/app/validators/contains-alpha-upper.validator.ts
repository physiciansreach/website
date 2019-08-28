import { AbstractControl, ValidationErrors } from '@angular/forms';

export function containsAlphaUpperValidator(control: AbstractControl): ValidationErrors {

    if (control.value && !control.value.match(/[A-Z]/)) {
        return { missingUpperAlpha: true };
    }

    return undefined;
}
