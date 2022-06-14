import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMisEquiposEntrenadorComponent } from './listado-mis-equipos-entrenador.component';

describe('ListadoMisEquiposEntrenadorComponent', () => {
  let component: ListadoMisEquiposEntrenadorComponent;
  let fixture: ComponentFixture<ListadoMisEquiposEntrenadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoMisEquiposEntrenadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoMisEquiposEntrenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
