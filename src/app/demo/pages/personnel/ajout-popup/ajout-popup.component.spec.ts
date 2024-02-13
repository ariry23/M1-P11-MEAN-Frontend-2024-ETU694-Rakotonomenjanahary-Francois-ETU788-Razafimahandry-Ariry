import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPopupComponent } from './ajout-popup.component';

describe('AjoutPopupComponent', () => {
  let component: AjoutPopupComponent;
  let fixture: ComponentFixture<AjoutPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutPopupComponent]
    });
    fixture = TestBed.createComponent(AjoutPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
