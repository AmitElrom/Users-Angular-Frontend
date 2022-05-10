import { TestBed } from '@angular/core/testing';

import { HttpProject2Service } from './http-project2.service';

describe('HttpProject2Service', () => {
  let service: HttpProject2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpProject2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
