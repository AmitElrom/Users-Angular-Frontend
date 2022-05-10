import { TestBed } from '@angular/core/testing';

import { ManipulateDataService } from './manipulate-data.service';

describe('ManipulateDataService', () => {
  let service: ManipulateDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManipulateDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
