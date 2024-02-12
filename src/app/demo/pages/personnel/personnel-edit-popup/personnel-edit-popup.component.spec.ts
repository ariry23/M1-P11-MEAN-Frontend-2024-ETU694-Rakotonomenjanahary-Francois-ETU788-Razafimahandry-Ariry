import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelEditPopupComponent } from './personnel-edit-popup.component';

describe('PersonnelEditPopupComponent', () => {
  let component: PersonnelEditPopupComponent;
  let fixture: ComponentFixture<PersonnelEditPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonnelEditPopupComponent]
    });
    fixture = TestBed.createComponent(PersonnelEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
