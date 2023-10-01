import { TestBed } from '@angular/core/testing';

import { TransformershapesService } from './transformershapes.service';
import { ShapeService } from './../../services/serviceshapes/shape.service';

describe('TransformershapesService', () => {
  let service: TransformershapesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformershapesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
