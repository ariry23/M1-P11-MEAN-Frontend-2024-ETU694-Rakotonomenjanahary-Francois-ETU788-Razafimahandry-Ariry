import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBasePageComponent } from './list-base-page.component';

describe('ListBasePageComponent', () => {
  let component: ListBasePageComponent;
  let fixture: ComponentFixture<ListBasePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBasePageComponent]
    });
    fixture = TestBed.createComponent(ListBasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
