import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ApiClientService} from './api-client.service';

describe('ApiClientService', () => {
    beforeEach(async () => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            ApiClientService
        ]
    }));

    it('should be created', () => {
        const service: ApiClientService = TestBed.inject(ApiClientService);
        expect(service).toBeTruthy();
    });

    xit('should be some tests');
});
