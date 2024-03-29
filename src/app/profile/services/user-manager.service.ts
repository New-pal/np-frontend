import {Injectable} from '@angular/core';
import {UserApiService} from '@app/profile/services/api/user-api.service';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {Observable, of, ReplaySubject} from 'rxjs';
import {User} from '@app/profile/models/user';
import {once} from '@app/core/decorators/once';
import {map, switchMap, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserManagerService {

    public readonly user$: Observable<User | null>;
    private readonly userSubject$: ReplaySubject<User | null> = new ReplaySubject<User | null>(1);

    constructor(
        private readonly userApi: UserApiService,
        private readonly auth: AuthenticationService
    ) {
        this.user$ = this.userSubject$.asObservable();
    }

    @once
    public init(): Promise<void> {
        return new Promise(resolve => {
            this.auth.isAuthenticated$.pipe(
                switchMap(a => !a ? of(null) : this.userApi.get().pipe(map(r => r.results.pop()))),
                tap(u => this.userSubject$.next(u)),
                tap(() => resolve(void 0))
            ).subscribe();
        });
    }

    public updateUser(user: User): Observable<User> {
        return this.userApi.patch(user, null).pipe(
            tap(u => this.userSubject$.next(u))
        );
    }
}
