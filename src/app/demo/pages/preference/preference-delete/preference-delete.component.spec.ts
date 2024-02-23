import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceDeleteComponent } from './preference-delete.component';

describe('PreferenceDeleteComponent', () => {
  let component: PreferenceDeleteComponent;
  let fixture: ComponentFixture<PreferenceDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreferenceDeleteComponent]
    });
    fixture = TestBed.createComponent(PreferenceDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
