import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootbathRxOnlyComponent } from './footbath-rx-only.component';

describe('FootbathRxOnlyComponent', () => {
  let component: FootbathRxOnlyComponent;
  let fixture: ComponentFixture<FootbathRxOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootbathRxOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootbathRxOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
