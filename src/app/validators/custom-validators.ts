import { AbstractControl, AbstractControlOptions, ValidationErrors, ValidatorFn } from '@angular/forms';

import { answerValidator } from './answer.validator';
import { containsAlphaLowerValidator } from './contains-alpha-lower.validator';
import { containsAlphaUpperValidator } from './contains-alpha-upper.validator';
import { containsNumberValidator } from './contains-number.validator';
import { dateValidator } from './date.validator';
import { emailValidator } from './email.validator';
import { equalValidator } from './equal.validator';
import { noSpaceAllowedValidator } from './no-space-allowed';
import { onlyNumericValidator } from './only-numeric.validator';
import { passwordValidator } from './password.validator';
import { phonenumberValidator } from './phone-number.validator';
import { stateValidator } from './state.validator';
import { zipMaskedValidator } from './zip-masked.validator';

// a class to expose all the reactive validations
export class CustomValidators {

    static zipMasked: ValidatorFn | ValidatorFn[] | AbstractControlOptions;


    static password(minLength: number, maxLength: number): ValidatorFn {
        return passwordValidator(minLength, maxLength);
    }

    static equal(otherControl: AbstractControl): ValidatorFn {
        return equalValidator(otherControl);
    }

    static state(control: AbstractControl): ValidationErrors {
        return stateValidator(control);
    }

    static zip(control: AbstractControl): ValidationErrors {
        return zipMaskedValidator(control);
    }

    static phonenumber(control: AbstractControl): ValidationErrors {
        return phonenumberValidator(control);
    }

    static emailAddress(control: AbstractControl): ValidationErrors {
        return emailValidator(control);
    }

    static noSpaceAllowed(control: AbstractControl): ValidationErrors {
        return noSpaceAllowedValidator(control);
    }

    static containsAlphaUpper(control: AbstractControl): ValidationErrors {
        return containsAlphaUpperValidator(control);
    }

    static containsAlphaLower(control: AbstractControl): ValidationErrors {
        return containsAlphaLowerValidator(control);
    }

    static containsNumber(control: AbstractControl): ValidationErrors {
        return containsNumberValidator(control);
    }

    static onlyNumeric(control: AbstractControl): ValidationErrors {
        return onlyNumericValidator(control);
    }

    static answer(control: AbstractControl): ValidationErrors {
        return answerValidator(control);
    }

    static date(control: AbstractControl): ValidationErrors {
        return dateValidator(control);
    }
}

