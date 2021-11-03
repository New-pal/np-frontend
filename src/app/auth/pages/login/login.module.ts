import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {LoginPageRoutingModule} from './login-routing.module';
import {LoginPage} from './login.page';
import {LoginFormComponent} from '@app/auth/components/login-form/login-form.component';
import {RegisterFormComponent} from '@app/auth/components/register-form/register-form.component';
import {LoginFormService} from '@app/auth/forms/login-form.service';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginPageRoutingModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    declarations: [
        LoginPage,
        LoginFormComponent,
        RegisterFormComponent
    ],
    exports: [
        RegisterFormComponent
    ],
    providers: [
        LoginFormService
    ]
})
export class LoginPageModule {
}
