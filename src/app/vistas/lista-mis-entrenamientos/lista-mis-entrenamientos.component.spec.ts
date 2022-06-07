import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMisEntrenamientosComponent } from './lista-mis-entrenamientos.component';

describe('ListaMisEntrenamientosComponent', () => {
  let component: ListaMisEntrenamientosComponent;
  let fixture: ComponentFixture<ListaMisEntrenamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaMisEntrenamientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMisEntrenamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
