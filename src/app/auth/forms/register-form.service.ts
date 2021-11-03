import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterFormFields} from '@app/auth/enums/register-form-fields';

@Injectable()
export class RegisterFormService {

    public form: FormGroup;

    constructor(private readonly builder: FormBuilder) {
    }

    public isFormValid(): boolean {
        return !this.form.valid;
    }

    public initForm(): void {
        this.form = this.builder.group({
            [RegisterFormFields.email]: ['', Validators.compose([
                Validators.required,
                Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+' +
                    '(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]' +
                    '{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')
            ])],
            [RegisterFormFields.name]: ['', Validators.required],
            [RegisterFormFields.password]: ['', Validators.required],
            [RegisterFormFields.confirm]: ['', Validators.required]
        },
            {validators: this.checkPassword});
    }

    private checkPassword(group: FormGroup): any {
        const isDirtyAndValid = (control: AbstractControl): boolean => control.dirty && control.valid;
        const passwordControl = group.get(RegisterFormFields.password);
        const confirmControl = group.get(RegisterFormFields.confirm);

        if (isDirtyAndValid(passwordControl) && isDirtyAndValid(confirmControl)) {
            if (passwordControl.value !== confirmControl.value) {
                return { passwordMismatch: true };
            }
        }

        return null;
    }
}
