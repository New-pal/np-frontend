import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';

/**
 *  Tries to refresh auth token if it has expired
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private readonly auth: AuthenticationService,
        private router: Router
    ) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        try {
            const url = new URL(req.url);
            if (url.origin !== environment.backend.url) {
                return next.handle(req);
            }
        } catch (e) {
            return next.handle(req);
        }
        if (this.getRestrictedUrls().includes(req.url)) {
            return next.handle(req);
        }

        return this.auth.needToRefresh().pipe(
            switchMap(
                (isNeedToRefresh: boolean) => isNeedToRefresh ?
                    this.auth.refresh().pipe(
                        catchError(() => this.router.navigateByUrl('/auth/login')),
                        switchMap(() => next.handle(req))
                    ) : next.handle(req)
            )
        );
    }

    private getRestrictedUrls(): string[] {
        return [
            environment.backend.url + environment.backend.refresh,
            environment.backend.url + environment.backend.auth,
            environment.backend.url + environment.backend.register
        ];
    }
}
