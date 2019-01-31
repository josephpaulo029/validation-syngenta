import { TestBed, inject } from '@angular/core/testing';

import { NeedAuthGuardService } from './need-auth-guard.service';

describe('NeedAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NeedAuthGuardService]
    });
  });

  it('should be created', inject([NeedAuthGuardService], (service: NeedAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
