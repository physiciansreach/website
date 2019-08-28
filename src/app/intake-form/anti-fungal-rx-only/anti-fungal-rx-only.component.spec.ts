import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiFungalRxOnlyComponent } from './anti-fungal-rx-only.component';

describe('AntiFungalRxOnlyComponent', () => {
  let component: AntiFungalRxOnlyComponent;
  let fixture: ComponentFixture<AntiFungalRxOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntiFungalRxOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntiFungalRxOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
