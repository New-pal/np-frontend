import { Injectable } from '@angular/core';
import {AbstractReadonlyApiService} from '@app/core/abstract/abstract-readonly-api.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Observable} from 'rxjs';
import {HelperService} from '@app/core/services/helper.service';
import {map} from 'rxjs/operators';
import {ApiServiceInterface} from '@app/core/interfaces/api-service-interface';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractApiService<T extends {id: number}> extends AbstractReadonlyApiService<T>
    implements ApiServiceInterface<T> {

    protected constructor(protected client: ApiClientService) {
        super(client);
    }

    public create(data: T): Observable<T> {
        return this.client.post<T, T>(this.getUrl(), HelperService.clear(data)).pipe(
            map(raw => this.transform(raw))
        );
    }

    public patch(data: Partial<T>, key?: string | number): Observable<T> {
        return this.client.patch<T>(`${this.getUrl() + (key ? key : data.id)}/`, HelperService.clear(data)).pipe(
            map(raw => this.transform(raw))
        );
    }

    // public put(data: T): Observable<T> {
    //     return this.client.put<T>(`${this.getUrl()}${data.id}/`, HelperService.clear(data)).pipe(
    //         map(raw => this.transform(raw))
    //     );
    // }

    public delete(data: T): Observable<any> {
        return this.client.delete(`${this.getUrl() + data.id}/`);
    }

    public createList(data: T[]): Observable<T[]> {
        return this.client.createList<T>(data, this.getUrl()).pipe(
            map(raw => this.transform(raw))
        );
    }

    public patchList(data: T[]): Observable<T[]> {
        return this.client.patchList<T>(data, this.getUrl()).pipe(
            map(raw => this.transform(raw))
        );
    }

    // public putList(data: T[]): Observable<T[]> {
    //     return this.client.putList<T>(data, this.getUrl()).pipe(
    //         map(raw => this.transform(raw))
    //     );
    // }

    public deleteList(data: T[]): Observable<any> {
        return this.client.deleteList(data, this.getUrl());
    }
}
