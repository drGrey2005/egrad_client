import { TestBed } from '@angular/core/testing';

import { GridFilterService } from './grid-filter.service';

describe('GridFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GridFilterService = TestBed.get(GridFilterService);
    expect(service).toBeTruthy();
  });
});
