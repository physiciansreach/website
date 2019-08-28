import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianAccountFormComponent } from './physician-account-form.component';

describe('PhysicianAccountFormComponent', () => {
  let component: PhysicianAccountFormComponent;
  let fixture: ComponentFixture<PhysicianAccountFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicianAccountFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicianAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
