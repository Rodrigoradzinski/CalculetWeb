import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRigthButtonNewprojectComponent } from './menu-rigth-button-newproject.component';

describe('MenuRigthButtonNewprojectComponent', () => {
  let component: MenuRigthButtonNewprojectComponent;
  let fixture: ComponentFixture<MenuRigthButtonNewprojectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuRigthButtonNewprojectComponent]
    });
    fixture = TestBed.createComponent(MenuRigthButtonNewprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
