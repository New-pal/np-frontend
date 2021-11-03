import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginFormFields} from '@app/auth/enums/login-form-fields';

@Injectable()
export class LoginFormService {

    public form: FormGroup;

    constructor(private readonly builder: FormBuilder) {
    }

    public isFormValid(): boolean {
        return !this.form.valid;
    }

    public initForm(): void {
        this.form = this.builder.group({
            [LoginFormFields.password]: ['', Validators.required],
            [LoginFormFields.email]: ['', Validators.compose([
                Validators.required,
                Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+' +
                    '(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]' +
                    '{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')
            ])]
        });
    }

    public valid(): boolean {
        return this.form.valid;
    }
}
