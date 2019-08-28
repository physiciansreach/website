import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPainDmeOnlyComponent } from './edit-pain-dme-only.component';

describe('EditPainDmeOnlyComponent', () => {
  let component: EditPainDmeOnlyComponent;
  let fixture: ComponentFixture<EditPainDmeOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPainDmeOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPainDmeOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
