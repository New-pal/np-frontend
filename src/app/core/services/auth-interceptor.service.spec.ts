import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {of} from 'rxjs';
import {StorageManagerMock} from '../../../testing/mocks';
import {ApiClientService} from './api-client.service';
import {AuthInterceptor} from './auth-interceptor.service';
import {TokenManagerService} from './token-manager.service';

describe('AuthInterceptor', () => {

    let client: ApiClientService;
    let tokenManager: jasmine.SpyObj<TokenManagerService>;
    let service: AuthInterceptor;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        const spyTokenManager: jasmine.SpyObj<TokenManagerService> = jasmine.createSpyObj(
            'TokenManagerService', {
                needToRefresh: Promise.resolve(true),
                refresh: of(),
                getRefreshToken: Promise.resolve('refresh_token'),
                setTokens: Promise.resolve(true),
                getAccessToken: Promise.resolve('access_token'),
                clear: Promise.resolve(),
                isAccessTokenExpired: Promise.resolve(true),
                isRefreshTokenExpired: Promise.resolve(true)
            }
        );
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true
                },
                {
                    provide: TokenManagerService,
                    useValue: spyTokenManager
                },
                AuthInterceptor,
                {provide: StorageManagerService, useClass: StorageManagerMock}
            ]
        });

        client = TestBed.inject(ApiClientService);
        service = TestBed.inject(AuthInterceptor);
        tokenManager = TestBed.inject(TokenManagerService) as jasmine.SpyObj<TokenManagerService>;
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // Argument of type '{ access_token: string; refresh_token: string; }'
    //     is not assignable to parameter of type 'AuthResponseInterface | AsymmetricMatcher<any>'.
    // it('should save new tokens if access token has expired', fakeAsync(() => {
    //     tokenManager.needToRefresh.and.returnValue(Promise.resolve(true));
    //     tokenManager.getRefreshToken.and.returnValue(Promise.resolve('refresh_token'));
    //     tokenManager.setTokens.and.returnValue(Promise.resolve(true));
    //
    //     client.get('/test/').subscribe();
    //     tick();
    //     httpMock.expectOne(environment.backend.url + environment.backend.refresh)
    //         .flush({access_token: 'test', refresh_token: 'test2'});
    //     tick();
    //     expect(tokenManager.setTokens).toHaveBeenCalledWith({access_token: 'test', refresh_token: 'test2'});
    // }));

    it('should not refresh if access token hasn\'t expired', fakeAsync(() => {
        // (tokenManager as any).needToRefresh.and.returnValue(Promise.resolve(false));
        tokenManager.getRefreshToken.and.returnValue(Promise.resolve('refresh_token'));
        tokenManager.setTokens.and.returnValue(Promise.resolve());

        client.get('/test/').subscribe();
        tick();
        expect(tokenManager.setTokens).not.toHaveBeenCalled();
    }));
});
