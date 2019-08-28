import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartburnAcidRxOnlyComponent } from './heartburn-acid-rx-only.component';

describe('HeartburnAcidRxOnlyComponent', () => {
  let component: HeartburnAcidRxOnlyComponent;
  let fixture: ComponentFixture<HeartburnAcidRxOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeartburnAcidRxOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartburnAcidRxOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
