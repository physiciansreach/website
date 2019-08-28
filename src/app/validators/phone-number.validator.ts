import { AbstractControl, ValidationErrors } from '@angular/forms';

export function phonenumberValidator(control: AbstractControl): ValidationErrors {

    const minimumLength = 10;
    const maximumLength = 15;

    if (!control.value) {
        return undefined;
    }

    const numbersOnlyValue = control.value.replace(/[^0-9\.]/g, '');

    if (numbersOnlyValue.length === 0) {
        return undefined;
    }

    if (numbersOnlyValue.length < minimumLength || numbersOnlyValue.length > maximumLength) {
        return { invalidPhoneNumber: true };
    }

    return undefined;
}
