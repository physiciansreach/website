import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianCreateComponent } from './physician-create.component';

describe('PhysicianCreateComponent', () => {
  let component: PhysicianCreateComponent;
  let fixture: ComponentFixture<PhysicianCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhysicianCreateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicianCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
