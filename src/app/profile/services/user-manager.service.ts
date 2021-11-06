import {Injectable} from '@angular/core';
import {UserApiService} from '@app/profile/services/api/user-api.service';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {Observable, of, ReplaySubject} from 'rxjs';
import {User} from '@app/profile/models/user';
import {NgDestroyService} from '@app/core/services/ng-destroy.service';
import {once} from '@app/core/decorators/once';
import {filter, map, switchMap, tap} from 'rxjs/operators';

@Injectable()
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
    public init(): Promise<boolean> {
        return new Promise(resolve => {
            this.auth.isAuthenticated$.pipe(
                filter(a => !a)
            ).subscribe(
                () => this.userSubject$.next(null)
            );
            resolve(true);
        });
    }

    public getUser(): Observable<User | null> {
        return this.userSubject$.pipe(
            switchMap(u => null === u ? this.userApi.get().pipe(map(r => r.results.pop())) : of(u))
        );
    }

    public updateUser(user: Partial<User>): Observable<User> {
        return this.userApi.patch(user).pipe(
            tap(u => this.userSubject$.next(u))
        );
    }
}