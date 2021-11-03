import {Injectable} from '@angular/core';
import {AuthResponseInterface} from '@app/auth/interfaces/auth-response.interface';
import {Credentials} from '@app/auth/interfaces/credentials';
import {once} from '@app/core/decorators/once';
import {LoginDataInterface} from '@app/core/interfaces/login-data-interface';
import {RefreshDataInterface} from '@app/core/interfaces/refresh-data-interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {PreLogoutService} from '@app/core/services/pre-logout.service';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {environment} from '@env/environment';
import {EMPTY, from, Observable, of, ReplaySubject} from 'rxjs';
import {first, switchMap, tap} from 'rxjs/operators';

/**
 *  Main authentication service
 */
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public readonly isAuthenticated$: Observable<boolean>;
    private readonly isAuthenticatedSubject$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    private readonly tokenObtainUrl = environment.backend.auth;
    private readonly tokenRefreshUrl = environment.backend.refresh;

    constructor(
        private readonly tokenManager: TokenManagerService,
        private readonly client: ApiClientService,
        private readonly preLogout: PreLogoutService
    ) {
        this.isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();
    }

    @once
    public init(): Promise<void> {
        return new Promise<void>(resolve => this.tokenManager.isRefreshTokenExpired()
            .then(isExp => {
                if (!isExp) {
                    return this.needToRefresh().pipe(
                        switchMap(isNeed => isNeed ?
                            this.refresh().pipe(
                                tap(() => resolve()),
                                tap(_ => this.isAuthenticatedSubject$.next(!isExp))
                            ) : of(this.isAuthenticatedSubject$.next(!isExp))
                        )
                    ).subscribe(
                        () => null,
                        _ => this.isAuthenticatedSubject$.next(false));
                }
                this.isAuthenticatedSubject$.next(!isExp);
            })
            .catch(_ => this.isAuthenticatedSubject$.next(false))
            .finally(
                () => {
                    this.tokenManager.isExpired$.subscribe(isExpired => this.isAuthenticated$.pipe(first()).subscribe(
                        previousIsAuthStatus => isExpired === previousIsAuthStatus ? this.isAuthenticatedSubject$.next(!isExpired) : EMPTY
                    ));
                    resolve();
                })
        );
    }

    public login({email, password}: Credentials): Observable<void> {
        return this.client.post<AuthResponseInterface, LoginDataInterface>(this.tokenObtainUrl, {
            email,
            password
        }).pipe(
            switchMap(result => from(this.tokenManager.setTokens(result))),
            tap(() => this.isAuthenticatedSubject$.next(true))
        );
    }

    public needToRefresh(): Observable<boolean> {
        return from(this.tokenManager.needToRefresh());
    }

    public logout(): Observable<void> {
        return from(this.preLogout.run()
            .then(() => this.tokenManager.clear())
            .then(() => this.isAuthenticatedSubject$.next(false)));
    }

    public authenticateWithToken(token: AuthResponseInterface): Promise<void> {
        return this.tokenManager.setTokens(token).then(_ => this.isAuthenticatedSubject$.next(true));
    }

    public refresh(): Observable<void> {
        return new Observable<void>(
            (subscriber) => {
                this.tokenManager.getRefreshToken().then(refresh => {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    const refreshData: RefreshDataInterface = {refresh_token: refresh};
                    this.client.post<AuthResponseInterface, RefreshDataInterface>(this.tokenRefreshUrl, refreshData).subscribe(
                        (response: AuthResponseInterface) => this.tokenManager.setTokens(response).then(
                            _ => {
                                subscriber.next();
                                subscriber.complete();
                            }
                        ),
                        _ => EMPTY
                    );
                }).catch(err => subscriber.error(err));
            }
        );
    }
}
