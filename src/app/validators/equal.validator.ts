import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function equalValidator(otherControl: AbstractControl): ValidatorFn {

    return (control: AbstractControl): ValidationErrors => {

        const error = { notEqual: true };
        const errorCode = 'notEqual';

        // only validate if the information is filled out
        if (!control.value || control.value === '' || !otherControl.value || otherControl.value === '') {
            return undefined;
        }

        if (control.value !== otherControl.value) {

            // add error to OTHER control
            if (!otherControl.hasError(errorCode)) {

                // assign new error to current error list
                const errors = Object.assign(otherControl.errors ? otherControl.errors : {}, error);

                // set other Controls error
                otherControl.setErrors(errors);
            }

            // return an error for THIS control
            return error;
        }

        // remove error from OTHER control
        if (otherControl.hasError(errorCode)) {
            // get other controls original errors
            // remove the notEqual error
            let errors = otherControl.errors;

            // I couldn't figure oute how to delete based on the error object so this is hard coded
            delete errors.notEqual;

            // if no errors left, use undefined
            if (Object.keys(errors).length === 0) {
                errors = undefined;
            }
            // set other controls errors
            otherControl.setErrors(errors);
        }

        // return undefined for THIS control
        return undefined;
    };
}
