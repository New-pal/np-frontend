import {TestBed} from '@angular/core/testing';

import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {StorageManagerMock} from 'src/testing/mocks';
import {PreLogoutService} from './pre-logout.service';

describe('PreLogoutService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            PreLogoutService,
            {provide: StorageManagerService, useClass: StorageManagerMock}
        ]
    }));

    it('should be created', () => {
        const service: PreLogoutService = TestBed.inject(PreLogoutService);
        expect(service).toBeTruthy();
    });
});
