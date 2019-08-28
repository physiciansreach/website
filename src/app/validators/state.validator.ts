import { AbstractControl, ValidationErrors } from '@angular/forms';

export function stateValidator(control: AbstractControl): ValidationErrors {

    const states = new Array(
        'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL',
        'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA',
        'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE',
        'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR',
        'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI',
        'WV', 'WY');

    if (control.value && states.indexOf(control.value.toUpperCase()) === -1) {
        return { invalidState: true };
    } else {
        return undefined;
    }

}

