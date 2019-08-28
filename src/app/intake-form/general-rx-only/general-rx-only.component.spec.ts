import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralRxOnlyComponent } from './general-rx-only.component';

describe('GeneralRxOnlyComponent', () => {
  let component: GeneralRxOnlyComponent;
  let fixture: ComponentFixture<GeneralRxOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralRxOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralRxOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
