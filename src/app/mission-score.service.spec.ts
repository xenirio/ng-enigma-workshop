import { TestBed } from '@angular/core/testing';

import { MissionScoreService } from './mission-score.service';

describe('MissionScoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MissionScoreService = TestBed.get(MissionScoreService);
    expect(service).toBeTruthy();
  });
});
