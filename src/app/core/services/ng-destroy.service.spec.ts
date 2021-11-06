import { TestBed } from '@angular/core/testing';

import { NgDestroyService } from './ng-destroy.service';

describe('NgDestroyService', () => {
  let service: NgDestroyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgDestroyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
