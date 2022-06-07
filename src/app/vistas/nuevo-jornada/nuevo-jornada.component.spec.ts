import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoJornadaComponent } from './nuevo-jornada.component';

describe('NuevoJornadaComponent', () => {
  let component: NuevoJornadaComponent;
  let fixture: ComponentFixture<NuevoJornadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoJornadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
