import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormHelperService {

    /**
     * Marks all controls in a form group as touched
     * @param formGroup - The group to touch
     */
    markFormGroupTouched(formGroup: FormGroup) {

        formGroup.markAsTouched();

        Object.keys(formGroup.controls).forEach(x => {
            const control = formGroup.controls[x];
            control.markAsTouched();
        });

    }

    /**
     * Set focus on the first control with an error
     * @param formGroup - The form group containing the controls
     */
    setFocusOnError(form: FormGroup) {
        if (!form.valid) {
            for (const formElementName in form.controls) {
                if (form.controls[formElementName] && form.controls[formElementName].errors != null) {
                    this.setFocusOnErrorById(formElementName);
                    break;
                }
            }
        }
    }

    /**
    * Set focus on the control with the ID provided
    * @param formGroup - The id of the control to focus on
    */
    setFocusOnErrorById(id: string) {
        let errorElement = document.getElementById(id);
        if (errorElement === undefined || errorElement === null) {
            window.scrollTo(0, 0);
        } else {

            errorElement.focus();
            // The checkbox doesn't seem to be playing nicely with scrollIntoView, it's parent's parent works fine though
            // The parent's parent makes the error message visible on error
            if (errorElement.hasAttribute('type') && errorElement.attributes['type'].value === 'checkbox') {
                errorElement = errorElement.parentElement.parentElement;
            } else {
                errorElement = errorElement.parentElement;
            }
            if (errorElement !== undefined && errorElement !== null) {
                errorElement.scrollIntoView(false);
            }
        }
    }
}
