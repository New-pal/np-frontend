import { TestBed } from '@angular/core/testing';

import { AbstractIpService } from './abstract-ip.service';

describe('AbstractIpService', () => {
  let service: AbstractIpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractIpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
