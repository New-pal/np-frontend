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

        return from(this.tokenManager.getAccessToken())
            .pipe(
                catchError(_ => next.handle(req.clone({headers: req.headers.append('Content-Type', 'application/json')}))),
                switchMap(token => {
                    const headers = req.headers;
                    // if (token) {
                    //     headers = req.headers.append('Authorization', 'Bearer ' + token);
                    // }
                    headers.append('Content-Type', 'application/json');

                    return next.handle(req.clone({headers}));
                })
            );
    }
}
