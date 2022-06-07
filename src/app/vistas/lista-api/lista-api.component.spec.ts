import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaApiComponent } from './lista-api.component';

describe('ListaApiComponent', () => {
  let component: ListaApiComponent;
  let fixture: ComponentFixture<ListaApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
