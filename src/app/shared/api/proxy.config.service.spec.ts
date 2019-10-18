import { TestBed } from '@angular/core/testing';

import { Proxy.ConfigService } from './proxy.config.service';

describe('Proxy.ConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Proxy.ConfigService = TestBed.get(Proxy.ConfigService);
    expect(service).toBeTruthy();
  });
});
