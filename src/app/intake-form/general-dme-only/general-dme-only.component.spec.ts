import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDmeOnlyComponent } from './general-dme-only.component';

describe('GeneralDmeOnlyComponent', () => {
  let component: GeneralDmeOnlyComponent;
  let fixture: ComponentFixture<GeneralDmeOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralDmeOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralDmeOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
