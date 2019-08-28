import { ValidatorFn, Validators } from '@angular/forms';

import { containsAlphaLowerValidator } from './contains-alpha-lower.validator';
import { containsAlphaUpperValidator } from './contains-alpha-upper.validator';
import { containsNumberValidator } from './contains-number.validator';
import { noSpaceAllowedValidator } from './no-space-allowed';

export function passwordValidator(minLength: number, maxLength: number): ValidatorFn {

    return Validators.compose([
        Validators.minLength(minLength),
        Validators.maxLength(maxLength),
        containsAlphaLowerValidator,
        containsAlphaUpperValidator,
        containsNumberValidator,
        noSpaceAllowedValidator
    ]);
}
