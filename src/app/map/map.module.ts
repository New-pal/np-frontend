import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MapPageRoutingModule} from './map-routing.module';

import {MapPage} from './map-page.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LocationService} from '@app/core/services/location/location.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MapPageRoutingModule,
        LeafletModule
    ],
    declarations: [MapPage],
    providers: [
        LocationService,
        Geolocation,
        LocationAccuracy
    ]
})
export class MapPageModule {
}
