import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBeneficeComponent } from './dashboard-benefice.component';

describe('DashboardBeneficeComponent', () => {
  let component: DashboardBeneficeComponent;
  let fixture: ComponentFixture<DashboardBeneficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardBeneficeComponent]
    });
    fixture = TestBed.createComponent(DashboardBeneficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
