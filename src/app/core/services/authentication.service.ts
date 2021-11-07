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
import {BehaviorSubject, EMPTY, from, Observable, of, ReplaySubject} from 'rxjs';
import {catchError, filter, first, map, switchMap, tap} from 'rxjs/operators';

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
    private readonly initSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private readonly tokenManager: TokenManagerService,
        private readonly client: ApiClientService,
        private readonly preLogout: PreLogoutService
    ) {
        this.isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();
    }

    @once
    public init(): Promise<void> {
        from(this.tokenManager.isRefreshTokenExpired()).pipe(
            switchMap(expired => {
                if (!expired) {
                    return this.needToRefresh().pipe(
                        switchMap(need => need
                            ? this.refresh().pipe(map(() => true))
                            : of(true)
                        )
                    );
                }
                return of(false);
            }),
            catchError(() => of(false)),
            tap(isAuth => this.isAuthenticatedSubject$.next(isAuth)),
            tap(() => this.initSubject$.next(true))
        ).subscribe(() => this.subscribeToTokenExp());

        return this.initSubject$.pipe(filter(inited => inited), first(), map(() => void 0)).toPromise();
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

    private subscribeToTokenExp(): void {
        this.tokenManager.isExpired$.subscribe(isExpired => this.isAuthenticatedSubject$.pipe(first()).subscribe(
            previousIsAuthStatus => {
                if (isExpired === previousIsAuthStatus) {
                    this.isAuthenticatedSubject$.next(!isExpired);
                }
            }
        ));
    }
}
