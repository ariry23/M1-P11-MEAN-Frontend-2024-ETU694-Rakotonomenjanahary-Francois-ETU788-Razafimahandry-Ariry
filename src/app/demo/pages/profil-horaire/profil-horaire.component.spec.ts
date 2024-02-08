import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilHoraireComponent } from './profil-horaire.component';

describe('ProfilHoraireComponent', () => {
  let component: ProfilHoraireComponent;
  let fixture: ComponentFixture<ProfilHoraireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilHoraireComponent]
    });
    fixture = TestBed.createComponent(ProfilHoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
