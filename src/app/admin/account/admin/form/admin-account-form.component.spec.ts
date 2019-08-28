import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountFormComponent } from './admin-account-form.component';

describe('AdminAccountFormComponent', () => {
  let component: AdminAccountFormComponent;
  let fixture: ComponentFixture<AdminAccountFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAccountFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
