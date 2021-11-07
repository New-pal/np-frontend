import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {first} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private readonly router: Router, private readonly auth: AuthenticationService) {
    }

    public canActivate(): Observable<boolean | UrlTree> {
        return new Observable<UrlTree | boolean>(s => this.auth.isAuthenticated$.pipe(first()).subscribe(
                isAuthenticated => {
                    if (isAuthenticated) {
                        s.next(true);
                    } else {
                        s.next(this.router.parseUrl('/auth/login'));
                    }
                    s.complete();
                },
                () => {
                    s.next(this.router.parseUrl('/auth/login'));
                    s.complete();
                }
            )
        );
    }
}
