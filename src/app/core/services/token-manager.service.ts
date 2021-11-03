import {Injectable} from '@angular/core';
import {AuthResponseInterface} from '@app/auth/interfaces/auth-response.interface';
import {once} from '@app/core/decorators/once';
import {ErrorList} from '@app/core/enums/error-list';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {environment} from '@env/environment';
import {Observable, Subject, timer} from 'rxjs';

const getTimestamp = (offset: number = 0): number => parseInt((new Date().getTime() / 1000).toFixed(0), 10) + offset;

@Injectable({
    providedIn: 'root'
})
export class TokenManagerService {

    public readonly isExpired$: Observable<boolean>;
    private tokenData: AuthResponseInterface;
    private readonly storageKey = 'api_token_data';
    private readonly isExpSubject$: Subject<boolean> = new Subject<boolean>();

    constructor(private readonly storage: StorageManagerService) {
        this.isExpired$ = this.isExpSubject$.asObservable();
    }

    @once
    public init(): void {
        timer(0, 1000).subscribe(() => this.isRefreshTokenExpired().then(isExp => this.isExpSubject$.next(isExp)).catch(
            _ => this.isExpSubject$.next(true)
        ));
    }

    public getAccessToken(): Promise<string> {
        if (this.tokenData && this.tokenData.access_token) {
            return Promise.resolve(this.tokenData.access_token);
        }

        return new Promise<string>((resolve, reject) => {
            this.getTokenData().then(
                (tokenData: AuthResponseInterface) => {
                    if (!tokenData?.access_token) {
                        return reject(Error(ErrorList.emptyTokenError));
                    }
                    this.tokenData = tokenData;
                    resolve(this.tokenData.access_token);
                }
            );
        });
    }

    public getRefreshToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.getTokenData().then(tokenData => tokenData?.refresh_token ?
                resolve(tokenData?.refresh_token) :
                reject(Error(ErrorList.emptyTokenError)));
        });
    }

    public setTokens(data: AuthResponseInterface): Promise<void> {
        this.tokenData = {
            ...data,
            /* eslint-disable @typescript-eslint/naming-convention */
            access_expire: getTimestamp(data.expires_in),
            refresh_expire: getTimestamp(environment.refreshTokenExpireTime)
        };

        return this.storage.set(this.storageKey, this.tokenData);
    }

    public clear(): Promise<any> {
        this.tokenData = undefined;

        return this.storage.remove(this.storageKey);
    }

    public needToRefresh(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.isAccessTokenExpired().then(
                (isAccessTokenExpired: boolean) => isAccessTokenExpired ?
                    this.isRefreshTokenExpired()
                        .then(isExpired => !isExpired ? resolve(true) : reject(Error(ErrorList.refreshTokenExpiredError)))
                        .catch(err => reject(err)) :
                    resolve(false)
            ).catch(err => reject(err));
        });
    }

    public isRefreshTokenExpired(): Promise<boolean> {
        return this.isAbstractTokenExpired('refresh_expire');
    }

    private isAccessTokenExpired(): Promise<boolean> {
        return this.isAbstractTokenExpired('access_expire');
    }

    private getTokenData(): Promise<AuthResponseInterface | null> {
        if (this.tokenData) {
            return Promise.resolve(this.tokenData);
        }

        return new Promise(resolve => {
            this.storage.get(this.storageKey).then(
                (tokenData: AuthResponseInterface) => resolve(tokenData)
            );
        });
    }

    private isAbstractTokenExpired(tokenType: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.getTokenData().then(
                (tokenData: AuthResponseInterface) => tokenData && tokenData[tokenType] ?
                    resolve(getTimestamp() >= tokenData[tokenType]) :
                    reject(Error(ErrorList.emptyTokenError))
            );
        });
    }
}
