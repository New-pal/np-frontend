import {ReadonlyApiServiceInterface} from '@app/core/interfaces/readonly-api-service-interface';
import {Observable} from 'rxjs';

export interface ApiServiceInterface<T> extends ReadonlyApiServiceInterface<T> {
    create(data: T): Observable<T>;
    createList(data: T[]): Observable<T[]>;
    patch(data: T, key?: string | number): Observable<T>;
    patchList(data: T[]): Observable<T[]>;
    // put(data: T): Observable<T>;
    // putList(data: T[]): Observable<T[]>;
    delete(data: T): Observable<any>;
    deleteList(data: T[]): Observable<any>;
}
