import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeTableComponent } from './intake-table.component';

describe('IntakeTableComponent', () => {
  let component: IntakeTableComponent;
  let fixture: ComponentFixture<IntakeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntakeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
