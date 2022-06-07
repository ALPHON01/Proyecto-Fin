import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoJornadasComponent } from './listado-jornadas.component';

describe('ListadoJornadasComponent', () => {
  let component: ListadoJornadasComponent;
  let fixture: ComponentFixture<ListadoJornadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoJornadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoJornadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
