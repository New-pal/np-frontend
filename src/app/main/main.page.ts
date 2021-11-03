import {Component} from '@angular/core';
import * as L from 'leaflet';
import {environment} from '@env/environment';
import {IonViewWillEnter} from '@app/core/interfaces/ionic.interfaces';
import {LocationService} from '@app/core/services/location/location.service';
import {Coordinates} from '@app/core/models/coordinates';


@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements IonViewWillEnter {

    public options: L.MapOptions;
    private map: L.Map;
    private layerGroup: L.LayerGroup;

    constructor(private location: LocationService) {
    }

    public ionViewWillEnter(): void {
        this.location.getCurrentCoordinates().subscribe(
            c => this.initMap(c)
        );
    }

    public onMapReady(map: L.Map): void {
        map.addControl(L.control.zoom({position: 'topright'}));
        this.map = map;
        this.layerGroup = L.layerGroup().addTo(this.map);
        setTimeout(() => this.map?.invalidateSize(true), 1000);
    }

    private initMap(coordinates: Coordinates | null): void {
        console.log(coordinates);
        const center: L.LatLngLiteral = {lat: 46.550429, lng: -30.499274};
        if (coordinates) {
            center.lat = coordinates.lat;
            center.lng = coordinates.lon;
        }
        const zoom = 12;
        this.options = {
            layers: [L.tileLayer(environment.mapUrl, {maxZoom: 18, attribution: '...'})],
            zoom,
            center,
            zoomControl: false,
        };
    }

}
