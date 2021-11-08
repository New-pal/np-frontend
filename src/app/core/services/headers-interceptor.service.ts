import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {environment} from '@env/environment';
import {from, Observable} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

/**
 * Sets headers while requesting api endpoints
 */
@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

    constructor(private readonly tokenManager: TokenManagerService) {
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

        return from(this.tokenManager.getAccessToken())
            .pipe(
                catchError(_ => next.handle(req.clone({headers: req.headers.append('Content-Type', 'application/json')}))),
                switchMap(token => {
                    let headers = req.headers;
                    if (token) {
                        headers = headers.append('Authorization', 'Bearer ' + token);
                    }
                    headers =  headers.append('Content-Type', 'application/json');

                    return next.handle(req.clone({headers}));
                })
            );
    }

    private getRestrictedUrls(): string[] {
        return [
            environment.backend.url + environment.backend.refresh,
            environment.backend.url + environment.backend.auth,
            environment.backend.url + environment.backend.register,
        ];
    }
}
