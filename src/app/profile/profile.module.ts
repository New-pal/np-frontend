import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProfilePageRoutingModule} from './profile-routing.module';

import {ProfilePage} from './profile.page';
import {UserApiService} from '@app/profile/services/api/user-api.service';
import {UserManagerService} from '@app/profile/services/user-manager.service';
import {ProfileUserFormService} from '@app/profile/forms/profile-user-form.service';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule,
        TranslateModule,
        ReactiveFormsModule
    ],
    declarations: [ProfilePage],
    providers: [
        UserApiService,
        ProfileUserFormService
    ]
})
export class ProfilePageModule {
}
