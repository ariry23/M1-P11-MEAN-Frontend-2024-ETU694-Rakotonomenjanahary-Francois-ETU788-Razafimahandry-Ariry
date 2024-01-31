import { TestBed } from '@angular/core/testing';

import { UtilCookieService } from './util-cookie.service';

describe('UtilCookieService', () => {
  let service: UtilCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
