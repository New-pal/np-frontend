import { Injectable } from '@angular/core';
import {ReadonlyApiServiceInterface} from '@app/core/interfaces/readonly-api-service-interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Observable} from 'rxjs';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response-interface';
import {map} from 'rxjs/operators';
import {HelperService} from '@app/core/services/helper.service';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractReadonlyApiService<T> implements ReadonlyApiServiceInterface<T> {

    protected constructor(protected client: ApiClientService) { }

    public get(params?: { [param: string]: string | string[] }): Observable<ApiListResponseInterface<T>> {
        return this.client.get(this.getUrl(), HelperService.clear(params)).pipe(
            map((raw: ApiListResponseInterface<T>) => {
                raw.results = this.transform(raw.results);

                return raw;
            })
        );
    }

    public getList(ids: number[] | string[]): Observable<T[]> {
        return this.client.getList<T>(ids, this.getUrl()).pipe(
            map(raw => this.transform(raw))
        );
    }

    public getByEntityId(entityId: number | string): Observable<T> {
        return this.client.get<T>(`${this.getUrl() + entityId}/`).pipe(
            map((raw: T) => this.transform(raw))
        );
    }

    public options<Q>(params?: { [param: string]: string | string[] }): Observable<Q> {
        return this.client.options<Q>(this.getUrl(), params);
    }

    protected abstract getUrl(): string;

    protected abstract transform(data: T): T;
    protected abstract transform(data: T[]): T[];
}
