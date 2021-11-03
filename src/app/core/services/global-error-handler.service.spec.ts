import {TestBed} from '@angular/core/testing';

import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {GlobalErrorHandlerService} from './global-error-handler.service';

describe('GlobalErrorHandlerService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            RouterTestingModule
        ],
        providers: [
            GlobalErrorHandlerService,
            {provide: AuthenticationService, useValue: {isAuthenticated: () => of(true)}}
        ]
    }));

    it('should be created', () => {
        const service: GlobalErrorHandlerService = TestBed.inject(GlobalErrorHandlerService);
        expect(service).toBeTruthy();
    });

    xit('should be some tests');
});
