import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDmeAndRxComponent } from './general-dme-and-rx.component';

describe('GeneralDmeAndRxComponent', () => {
  let component: GeneralDmeAndRxComponent;
  let fixture: ComponentFixture<GeneralDmeAndRxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralDmeAndRxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralDmeAndRxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
