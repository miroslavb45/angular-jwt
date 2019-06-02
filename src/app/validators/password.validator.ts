import { FormControl } from '@angular/forms';
import { of, Observable } from 'rxjs';

export interface ValidationResult {
    [key: string]: boolean;
}

export class PasswordValidator {

    public static strong(control: FormControl): ValidationResult {
        let hasNumber = /\d/.test(control.value);
        let hasUpper = /[A-Z]/.test(control.value);
        let hasLower = /[a-z]/.test(control.value);
        let long = /^[a-zA-Z0-9]{8,}$/.test(control.value);
        const valid = hasNumber && hasUpper && hasLower && long;

        if (!valid) {
            return { weak: true };
        } 
        return null;
    }
}