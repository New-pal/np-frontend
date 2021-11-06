import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProfilePageRoutingModule} from './profile-routing.module';

import {ProfilePage} from './profile.page';
import {UserApiService} from '@app/profile/services/api/user-api.service';
import {UserManagerService} from '@app/profile/services/user-manager.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule
    ],
    declarations: [ProfilePage],
    providers: [
        UserApiService,
        UserManagerService
    ]
})
export class ProfilePageModule {
}
