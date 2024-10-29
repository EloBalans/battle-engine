import { TestBed } from '@angular/core/testing';

import { HexPathfinderService } from './hex-pathfinder.service';

describe('HexPathfinderService', () => {
  let service: HexPathfinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HexPathfinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
