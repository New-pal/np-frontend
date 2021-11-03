import {NgModule} from '@angular/core';
import {AuthRoutingModule} from '@app/auth/auth-routing.module';
import {RegistrationService} from '@app/auth/services/registration.service';


@NgModule({
    declarations: [],
    imports: [
        AuthRoutingModule
    ],
    providers: [
        RegistrationService
    ]
})
export class AuthModule {
}
