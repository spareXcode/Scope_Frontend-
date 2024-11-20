import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpmDashboardComponent } from './spm-dashboard.component';

describe('SpmDashboardComponent', () => {
  let component: SpmDashboardComponent;
  let fixture: ComponentFixture<SpmDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpmDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpmDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
