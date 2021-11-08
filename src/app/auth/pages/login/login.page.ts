import {Component} from '@angular/core';
import {IonViewWillEnter} from '@app/core/interfaces/ionic.interfaces';
import {Credentials} from '@app/auth/interfaces/credentials';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements IonViewWillEnter {

    constructor(private auth: AuthenticationService, private router: Router) {
    }

    public ionViewWillEnter(): void {

    }

    public onLogin(credentials: Credentials): void {
        this.auth.login(credentials).subscribe(
            _ => this.router.navigateByUrl('/'),
        );
    }
}
