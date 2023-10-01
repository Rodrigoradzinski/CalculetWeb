import { TestBed } from '@angular/core/testing';

import { OrganizeShapesService } from './organizeshapes.service';

describe('OrganizeshapesService', () => {
  let service: OrganizeShapesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizeShapesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
