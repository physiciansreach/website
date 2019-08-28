//

import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateValidator(control: AbstractControl): ValidationErrors {

    if (control.value && !control.value.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
        return { invalidDateFormat: true };
    }

    return undefined;
}