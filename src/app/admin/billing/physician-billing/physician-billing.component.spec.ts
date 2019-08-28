import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianBillingComponent } from './physician-billing.component';

describe('PhysicianBillingComponent', () => {
  let component: PhysicianBillingComponent;
  let fixture: ComponentFixture<PhysicianBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicianBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicianBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
