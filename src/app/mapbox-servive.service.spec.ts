import { TestBed } from '@angular/core/testing';

import { MapboxServiveService } from './mapbox-servive.service';

describe('MapboxServiveService', () => {
  let service: MapboxServiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapboxServiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
