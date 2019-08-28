import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailValidator(control: AbstractControl): ValidationErrors {

    if (control.value && !control.value.match(/.+\@.+\..+/)) {
        return { invalidEmail: true };
    }

    return undefined;
}
