import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarOrdenComponent } from './buscar-orden.component';

describe('BuscarOrdenComponent', () => {
  let component: BuscarOrdenComponent;
  let fixture: ComponentFixture<BuscarOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarOrdenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
