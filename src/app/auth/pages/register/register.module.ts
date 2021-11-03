import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {RegisterPageRoutingModule} from './register-routing.module';

import {RegisterPage} from './register.page';
import {RegisterFormService} from '@app/auth/forms/register-form.service';
import {LoginPageModule} from '@app/auth/pages/login/login.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RegisterPageRoutingModule,
        LoginPageModule
    ],
    declarations: [RegisterPage],
    providers: [
        RegisterFormService
    ]
})
export class RegisterPageModule {
}
