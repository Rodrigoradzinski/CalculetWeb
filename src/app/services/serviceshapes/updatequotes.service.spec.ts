import { TestBed } from '@angular/core/testing';

import { UpdatequotesService } from './updatequotes.service';

describe('UpdatequotesService', () => {
  let service: UpdatequotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatequotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
