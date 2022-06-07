import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMisEquiposComponent } from './listado-mis-equipos.component';

describe('ListadoMisEquiposComponent', () => {
  let component: ListadoMisEquiposComponent;
  let fixture: ComponentFixture<ListadoMisEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoMisEquiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoMisEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
