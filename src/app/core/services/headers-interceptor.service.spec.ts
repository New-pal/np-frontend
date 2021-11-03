import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {environment} from '@env/environment';
import {ApiClientService} from './api-client.service';
import {HeadersInterceptor} from './headers-interceptor.service';
import {TokenManagerService} from './token-manager.service';


describe('HeadersInterceptor', () => {

    let client: jasmine.SpyObj<ApiClientService>;
    let tokenManager: jasmine.SpyObj<TokenManagerService>;
    let service: HeadersInterceptor;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        const spyTokenManager = jasmine.createSpyObj(
            'TokenManagerService', {
                getAccessToken: () => Promise.resolve('access_token')
            }
        );
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HeadersInterceptor,
                    multi: true
                },
                {
                    provide: TokenManagerService,
                    useValue: spyTokenManager
                },
                HeadersInterceptor
            ]
        });

        client = TestBed.inject(ApiClientService) as jasmine.SpyObj<ApiClientService>;
        service = TestBed.inject(HeadersInterceptor);
        tokenManager = TestBed.inject(TokenManagerService) as jasmine.SpyObj<TokenManagerService>;
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should save new tokens if access token has expired', fakeAsync(() => {
        tokenManager.getAccessToken.and.returnValue(Promise.resolve('access_token'));

        client.get('/test/').subscribe();
        tick();
        const req = httpMock.expectOne(environment.backend.url + '/test/');
        tick();
        expect(req.request.headers.has('Authorization')).toEqual(true);
        expect(req.request.headers.get('Authorization')).toEqual('Bearer access_token');
    }));
});
