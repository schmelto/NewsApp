import { TestBed } from '@angular/core/testing';

import { EventlistenerService } from './eventlistener.service';

describe('EventlistenerService', () => {
  let service: EventlistenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventlistenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
