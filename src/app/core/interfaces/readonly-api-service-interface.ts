import {Observable} from 'rxjs';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response-interface';

export interface ReadonlyApiServiceInterface<T> {
    get(params?: { [param: string]: string | string[] | boolean }): Observable<ApiListResponseInterface<T>>;
    getByEntityId(entityId: number | string): Observable<T>;
    getList(ids: number[]): Observable<T[]>;
}
