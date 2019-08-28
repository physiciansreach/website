import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePainDmeOnlyComponent } from './create-pain-dme-only.component';

describe('CreatePainDmeOnlyComponent', () => {
  let component: CreatePainDmeOnlyComponent;
  let fixture: ComponentFixture<CreatePainDmeOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePainDmeOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePainDmeOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
