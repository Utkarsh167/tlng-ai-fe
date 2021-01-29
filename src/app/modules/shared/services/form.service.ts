import { Injectable } from '@angular/core';
import { Validators, AbstractControl } from '@angular/forms';
import { PATTERN } from '../../../constant/patterns';
import { VALIDATION_CRITERIA } from '../../../constant/validation-criteria';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Injectable({
    providedIn: 'root'
})
export class FormService {
    constructor() {
    }
    VALIDATION = {
        name: [
            Validators.pattern(PATTERN.alphabetsWithSpace),
            Validators.minLength(VALIDATION_CRITERIA.nameMinLength),
            Validators.maxLength(VALIDATION_CRITERIA.nameMaxLength)
        ],
        id: [
            Validators.pattern(PATTERN.noSpace),
            Validators.minLength(VALIDATION_CRITERIA.nameMinLength),
            Validators.maxLength(VALIDATION_CRITERIA.nameMaxLength),
        ],
        profileName: [
            Validators.pattern(PATTERN.name),
            Validators.minLength(VALIDATION_CRITERIA.nameMinLength),
            Validators.maxLength(VALIDATION_CRITERIA.nameMaxLength)
        ],
        alphabetic: [
            Validators.pattern(PATTERN.alphabetsWithSpace),
            Validators.minLength(VALIDATION_CRITERIA.nameMinLength),
            Validators.maxLength(VALIDATION_CRITERIA.nameMaxLength)
        ],
        alphaNumeric: [
            Validators.pattern(PATTERN.alphaNumericWithSpace),
            Validators.minLength(VALIDATION_CRITERIA.nameMinLength),
            Validators.maxLength(VALIDATION_CRITERIA.nameMaxLength)
        ],
        // regNo: [
        //     Validators.pattern(PATTERN.alphaNumericWithSpace),
        //     Validators.minLength(VALIDATION_CRITERIA.nameMinLength),
        //     Validators.maxLength(VALIDATION_CRITERIA.regNoMaxLength)
        // ],
        number: [
            Validators.pattern(PATTERN.onlyNumber),
            Validators.minLength(VALIDATION_CRITERIA.numberMinLength),
            Validators.maxLength(VALIDATION_CRITERIA.numberMaxLength)
        ],
        price: [
            Validators.pattern(PATTERN.price),
            Validators.minLength(VALIDATION_CRITERIA.priceMinLength),
            Validators.maxLength(VALIDATION_CRITERIA.priceMaxLength),
            Validators.min(0)
        ],
        seatingCapacity: [
            Validators.required,
            Validators.pattern(PATTERN.phone),
            Validators.min(VALIDATION_CRITERIA.minSeat),
            Validators.max(VALIDATION_CRITERIA.maxSeat)
        ],
        email: [
            Validators.pattern(PATTERN.email),
            Validators.maxLength(VALIDATION_CRITERIA.emailMaxLength)
        ],
        description: [
            Validators.pattern(PATTERN.name),
            Validators.minLength(VALIDATION_CRITERIA.locationMinLength),
            Validators.maxLength(VALIDATION_CRITERIA.locationMaxLength)
        ],
        password: [
            Validators.pattern(PATTERN.password),
            Validators.minLength(VALIDATION_CRITERIA.passwordMinLength),
            Validators.maxLength(VALIDATION_CRITERIA.passwordMaxLength),
        ],
        phone: [
            Validators.required,
            Validators.pattern(PATTERN.phone),
            Validators.minLength(VALIDATION_CRITERIA.phoneMinLength),
            Validators.maxLength(VALIDATION_CRITERIA.phoneMaxLength)
        ],
        crfLimitMonth: [
            Validators.required,
            Validators.pattern(PATTERN.onlyNumber),
        ],
        phoneManual: [
            Validators.pattern(PATTERN.phone),
            // Validators.minLength(VALIDATION_CRITERIA.phoneMinLength),
            Validators.maxLength(VALIDATION_CRITERIA.phoneMaxLength)
        ],
        dropdown: [],
        checkbox: [],
        address: [
            Validators.required,
        ],
        longitude: [
            Validators.required,
        ],
        latitude: [
            Validators.required,
        ],
        startShift: [
            Validators.required,
        ],
        endShift: [
            Validators.required,
        ],
        googleAddress: [
            Validators.required,
            Validators.minLength(VALIDATION_CRITERIA.nameMinLength),
            Validators.maxLength(VALIDATION_CRITERIA.nameMaxLength)
        ],
        noSpace: [
            Validators.required,
            Validators.pattern(PATTERN.noSpace)
        ],
        date: [],
        regNo: [
            Validators.required,
            Validators.minLength(VALIDATION_CRITERIA.regNoMinLength),
            Validators.maxLength(VALIDATION_CRITERIA.regNoMaxLength),
        ],
    }


    matchPassword(form: AbstractControl) {
        let password = form.get('password').value;
        let confirmPassword = form.get('confirmPassword').value;
        if(!password || !confirmPassword) {
           return;
        } else {
            form.get('confirmPassword').setErrors(null)
        }
        if (password !== confirmPassword) {
            form.get('confirmPassword').setErrors({ matchPassword: true })
        } else {
            if (password === confirmPassword) {
                if (form.get('confirmPassword').errors) {
                    delete form.get('confirmPassword').errors['matchPassword'];
                    let keys = Object.keys(form.get('confirmPassword').errors);
                    if (keys.length === 0) {
                        form.get('confirmPassword').setErrors(null);
                    }
                }
            }

        }
    }
    getControl(name, required = true) {
        let compose = [...this.VALIDATION[name]];
        if (required) {
            if (name === 'checkbox') {
                compose.splice(0, 0, Validators.requiredTrue);
            } else {
                compose.splice(0, 0, Validators.required);
            }
        }
        return ['', Validators.compose(
            compose
        )];
    }
    getFilterFormControls(keys: string[]) {
        let form = {};
        for (let key of keys) {
            form[key] = [null];
        }
        return form;
    }

}

