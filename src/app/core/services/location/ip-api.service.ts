import {Injectable} from '@angular/core';
import {AbstractIpService} from '@app/core/services/location/abstract-ip.service';
import {HttpClient} from '@angular/common/http';
import {Coordinates} from '@app/core/models/coordinates';

@Injectable({
    providedIn: 'root'
})
export class IpApiService extends AbstractIpService {

    constructor(protected http: HttpClient) {
        super(http);
    }

    protected getUrl(): string {
        return 'https://ipapi.co/json/';
    }

    protected transform(res: IpApiResponseInterface): Coordinates {
        if (res.error) {
            throw Error;
        }
        const location = new Coordinates();
        location.lat = parseFloat(res.latitude);
        location.lon = parseFloat(res.longitude);

        return location;
    }
}

interface IpApiResponseInterface {
    ip: string;
    postal: string;
    error: string;
    city: string;
    timezone: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    country_code: string;
    latitude: string;
    longitude: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    region_code: string;
}
