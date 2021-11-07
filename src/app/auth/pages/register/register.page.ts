import {Component, OnInit} from '@angular/core';
import {RegisterCredentials} from '@app/auth/interfaces/register-credentials';
import {RegistrationService} from '@app/auth/services/registration.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    constructor(private registrationService: RegistrationService, private router: Router) {
    }

    ngOnInit() {
    }

    public onRegister(credentials: RegisterCredentials): void {
        this.registrationService.register(credentials).subscribe(
            () => this.router.navigateByUrl('/'),
            err => console.error(err)
        );
    }
}
