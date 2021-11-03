import {Component, OnInit} from '@angular/core';
import {RegisterCredentials} from '@app/auth/interfaces/register-credentials';
import {RegistrationService} from '@app/auth/services/registration.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    constructor(private registrationService: RegistrationService) {
    }

    ngOnInit() {
    }

    public onRegister(credentials: RegisterCredentials): void {
        this.registrationService.register(credentials).subscribe(
            _ => console.log(_),
            err => console.error(err)
        );
    }
}
