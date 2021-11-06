import { TestBed } from '@angular/core/testing';

import { AbstractReadonlyApiService } from './abstract-readonly-api.service';

describe('AbstractReadonlyApiService', () => {
  let service: AbstractReadonlyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractReadonlyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
