import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutsummaryComponent } from './checkoutsummary.component';

describe('CheckoutsummaryComponent', () => {
  let component: CheckoutsummaryComponent;
  let fixture: ComponentFixture<CheckoutsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutsummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
