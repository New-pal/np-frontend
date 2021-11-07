import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RegisterFormService} from '@app/auth/forms/register-form.service';
import {RegisterFormFields} from '@app/auth/enums/register-form-fields';
import {RegisterCredentials} from '@app/auth/interfaces/register-credentials';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {

    @Output() private registerCredentials: EventEmitter<RegisterCredentials> = new EventEmitter<RegisterCredentials>();
    public formFields = RegisterFormFields;

    constructor(public formService: RegisterFormService) {
    }

    ngOnInit() {
        this.formService.initForm();
    }

    public submitRegister(): void {
        this.registerCredentials.emit({
            /* eslint-disable @typescript-eslint/naming-convention */
            first_name: this.formService.form.get(this.formFields.firstName).value,
            last_name: this.formService.form.get(this.formFields.lastName).value,
            gender: this.formService.form.get(this.formFields.gender).value,
            email: this.formService.form.get(this.formFields.email).value,
            password: this.formService.form.get(this.formFields.password).value
        });
    }
}
