import { TestBed } from '@angular/core/testing';

import { ActionLogListService } from './action-log-list.service';

describe('ActionLogListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionLogListService = TestBed.get(ActionLogListService);
    expect(service).toBeTruthy();
  });
});
