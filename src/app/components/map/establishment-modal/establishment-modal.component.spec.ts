import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentModalComponent } from './establishment-modal.component';

describe('EstablishmentModalComponent', () => {
  let component: EstablishmentModalComponent;
  let fixture: ComponentFixture<EstablishmentModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstablishmentModalComponent]
    });
    fixture = TestBed.createComponent(EstablishmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
