import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaApiInfoComponent } from './lista-api-info.component';

describe('ListaApiInfoComponent', () => {
  let component: ListaApiInfoComponent;
  let fixture: ComponentFixture<ListaApiInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaApiInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaApiInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
