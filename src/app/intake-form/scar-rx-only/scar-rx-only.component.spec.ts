import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScarRxOnlyComponent } from './scar-rx-only.component';

describe('ScarRxOnlyComponent', () => {
  let component: ScarRxOnlyComponent;
  let fixture: ComponentFixture<ScarRxOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScarRxOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScarRxOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
