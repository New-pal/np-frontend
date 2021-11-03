import {TestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {AuthResponseInterface} from '@app/auth/interfaces/auth-response.interface';
import {TokenManagerService} from './token-manager.service';

describe('TokenManagerService', () => {

    const tokenData: AuthResponseInterface = {
        /* eslint-disable @typescript-eslint/naming-convention */
        access_token: 'access_token',
        expires_in: 5,
        token_type: 'Baerer',
        scope: 'read write groups',
        refresh_token: 'refresh_token'
    };

    beforeEach(() => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule,
            platformBrowserDynamicTesting());
    });


    it('should be created', () => {
        const service: TokenManagerService = TestBed.inject(TokenManagerService);

        expect(service).toBeTruthy();
    });
});
