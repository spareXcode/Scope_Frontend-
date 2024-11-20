import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRequestStatusCardComponent } from './order-request-status-card.component';

describe('OrderRequestStatusCardComponent', () => {
  let component: OrderRequestStatusCardComponent;
  let fixture: ComponentFixture<OrderRequestStatusCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderRequestStatusCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderRequestStatusCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
