import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueComponent } from './historique.component';

describe('HistoriqueReservationComponent', () => {
  let component: HistoriqueComponent;
  let fixture: ComponentFixture<HistoriqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueComponent]
    });
    fixture = TestBed.createComponent(HistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
