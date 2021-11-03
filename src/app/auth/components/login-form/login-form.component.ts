import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginFormService} from '@app/auth/forms/login-form.service';
import {LoginFormFields} from '@app/auth/enums/login-form-fields';
import {Credentials} from '@app/auth/interfaces/credentials';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

    @Output() private credentials: EventEmitter<Credentials> = new EventEmitter<Credentials>();
    public formFields = LoginFormFields;

    constructor(public formService: LoginFormService) {
    }

    public ngOnInit(): void {
        this.formService.initForm();
    }

    public submitLogin(): void {
        this.credentials.emit(this.formService.form.value);
    }
}
