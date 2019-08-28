import { AbstractControl, ValidationErrors } from '@angular/forms';

export function answerValidator(control: AbstractControl): ValidationErrors {

    if (control.value === null || (control.value && control.value.length > 300 )) {
        return { required: true };
    }

    return undefined;
}
