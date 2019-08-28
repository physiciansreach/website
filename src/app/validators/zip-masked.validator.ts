import { AbstractControl } from '@angular/forms';

export const zipMaskedValidator = (control: AbstractControl): { [key: string]: boolean } => {

    if (control.value === undefined || control.value === null) {
        return undefined;
    }

    const numbersOnlyValue = control.value.replace(/[^0-9\.]/g, '');

    if (control.value && numbersOnlyValue.length !== 5) {
        return { invalidLength: true };
    }
};
