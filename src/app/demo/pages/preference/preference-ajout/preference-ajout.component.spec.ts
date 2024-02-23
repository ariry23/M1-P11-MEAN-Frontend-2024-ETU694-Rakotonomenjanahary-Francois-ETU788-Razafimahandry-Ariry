import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceAjoutComponent } from './preference-ajout.component';

describe('PreferenceAjoutComponent', () => {
  let component: PreferenceAjoutComponent;
  let fixture: ComponentFixture<PreferenceAjoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreferenceAjoutComponent]
    });
    fixture = TestBed.createComponent(PreferenceAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
