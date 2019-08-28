import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainDmeOnlyComponent } from './pain-dme-only.component';

describe('PainDmeOnlyComponent', () => {
  let component: PainDmeOnlyComponent;
  let fixture: ComponentFixture<PainDmeOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainDmeOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainDmeOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
