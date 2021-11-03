import {fakeAsync, flush, TestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {Credentials} from '@app/auth/interfaces/credentials';
import {from} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {TokenManagerService} from './token-manager.service';

describe('AuthenticationService', () => {
    let service: AuthenticationService;

    beforeEach(() => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule,
            platformBrowserDynamicTesting());

        TestBed.configureTestingModule({
            providers: [
            ]
        });

        service = TestBed.inject(AuthenticationService);
        TestBed.inject(TokenManagerService).init();
        service.init();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
