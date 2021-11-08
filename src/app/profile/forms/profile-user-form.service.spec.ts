import { TestBed } from '@angular/core/testing';

import { ProfileUserFormService } from './profile-user-form.service';

describe('ProfileUserFormService', () => {
  let service: ProfileUserFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileUserFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
