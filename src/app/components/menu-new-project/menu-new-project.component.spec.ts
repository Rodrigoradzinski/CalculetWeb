import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuNewProjectComponent } from './menu-new-project.component';

describe('MenuNewProjectComponent', () => {
  let component: MenuNewProjectComponent;
  let fixture: ComponentFixture<MenuNewProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuNewProjectComponent]
    });
    fixture = TestBed.createComponent(MenuNewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
