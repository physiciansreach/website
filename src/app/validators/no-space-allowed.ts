import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noSpaceAllowedValidator(control: AbstractControl): ValidationErrors {

    if (control.value && control.value.match(/[\s]/)) {
        return { noSpaceAllowed: true };
    }

    return undefined;
}
