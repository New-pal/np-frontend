import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MainPageRoutingModule} from './main-routing.module';

import {MainPage} from './main.page';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LocationService} from '@app/core/services/location/location.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MainPageRoutingModule,
        LeafletModule
    ],
    declarations: [MainPage],
    providers: [
        LocationService,
        Geolocation,
        LocationAccuracy
    ]
})
export class MainPageModule {
}
