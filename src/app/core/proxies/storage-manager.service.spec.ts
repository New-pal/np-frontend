import { TestBed } from '@angular/core/testing';

import {IonicStorageModule} from '@ionic/storage';
import {StorageManagerService} from './storage-manager.service';

describe('StorageManagerService', () => {

  let storageMock: Partial<Storage>;

  beforeEach(() => {
    storageMock = {
      get: jasmine.createSpy('get').and.returnValue(Promise.resolve(null)),
      set: jasmine.createSpy('set').and.returnValue(Promise.resolve(null))
    };
  });

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: Storage, useValue: storageMock },
      StorageManagerService
    ],
    imports: [
        IonicStorageModule.forRoot()
    ]
  }));

  it('should be created', () => {
    const service: StorageManagerService = TestBed.inject(StorageManagerService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
