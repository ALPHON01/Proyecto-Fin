import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoSolicitudComponent } from './nuevo-solicitud.component';

describe('NuevoSolicitudComponent', () => {
  let component: NuevoSolicitudComponent;
  let fixture: ComponentFixture<NuevoSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
