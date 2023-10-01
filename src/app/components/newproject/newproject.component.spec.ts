import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewprojectComponent } from './newproject.component';

describe('NewprojectComponent', () => {
  let component: NewprojectComponent;
  let fixture: ComponentFixture<NewprojectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewprojectComponent]
    });
    fixture = TestBed.createComponent(NewprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
