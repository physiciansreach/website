import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RashSkinRxOnlyComponent } from './rash-skin-rx-only.component';

describe('RashSkinRxOnlyComponent', () => {
  let component: RashSkinRxOnlyComponent;
  let fixture: ComponentFixture<RashSkinRxOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RashSkinRxOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RashSkinRxOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
