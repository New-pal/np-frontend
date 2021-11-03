import {Injectable} from '@angular/core';
import {AbstractIpService} from '@app/core/services/location/abstract-ip.service';
import {IpApiService} from '@app/core/services/location/ip-api.service';
import {Coordinates} from '@app/core/models/coordinates';
import {from, Observable, of, onErrorResumeNext} from 'rxjs';
import {catchError, first, switchMap} from 'rxjs/operators';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import {Geoposition, Geolocation} from '@ionic-native/geolocation/ngx';
// import * as Geo from '@ionic-native/geolocation/ngx';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    private readonly ipServices: AbstractIpService[] = [
        this.ipApi
    ];

    constructor(
        private readonly geolocation: Geolocation,
        private ipApi: IpApiService,
        private readonly locationAccuracy: LocationAccuracy
    ) {
    }

    public getCurrentCoordinates(): Observable<Coordinates | null> {
        return from(this.getFromGeolocation()).pipe(
            switchMap(d => null === d ? this.getFromIp() : of(d))
        );
    }

    public getFromGeolocation(): Promise<Coordinates | null> {
        return new Promise<Coordinates>(resolve => this.locationAccuracy.canRequest().then(
            (canRequest: boolean) => canRequest ?
                this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                    () => this.geolocation.getCurrentPosition().then(
                        (geo: Geoposition) => resolve({lat: geo.coords.latitude, lon: geo.coords.longitude})
                    )
                ).catch(_ => resolve(null)) :
                this.geolocation.getCurrentPosition().then(
                    (geo: Geoposition) => resolve({lat: geo.coords.latitude, lon: geo.coords.longitude})
                ).catch(_ => resolve(null))
        ).catch(_ => resolve(null)));
    }

    public getFromIp(): Observable<Coordinates | null> {
        return onErrorResumeNext(...this.ipServices.map(service => service.getData())).pipe(
            first(),
            catchError(e => of(null))
        );
    }
}
