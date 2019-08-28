import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAccountFormComponent } from './vendor-account-form.component';

describe('VendorAccountFormComponent', () => {
  let component: VendorAccountFormComponent;
  let fixture: ComponentFixture<VendorAccountFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAccountFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
