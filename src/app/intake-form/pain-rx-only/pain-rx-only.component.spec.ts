import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainRxOnlyComponent } from './pain-rx-only.component';

describe('PainRxOnlyComponent', () => {
  let component: PainRxOnlyComponent;
  let fixture: ComponentFixture<PainRxOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainRxOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainRxOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
