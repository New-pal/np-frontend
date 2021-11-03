import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Coordinates} from '@app/core/models/coordinates';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export abstract class AbstractIpService {

    protected constructor(protected http: HttpClient) {
    }

    public getData(): Observable<Coordinates> {
        return this.http.get(this.getUrl()).pipe(
            map(raw => this.transform(raw))
        );
    }

    protected abstract getUrl(): string;

    // eslint-disable-next-line @typescript-eslint/ban-types
    protected abstract transform(res: object): Coordinates;
}
