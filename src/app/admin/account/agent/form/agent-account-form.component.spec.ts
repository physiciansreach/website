import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentAccountFormComponent } from './agent-account-form.component';

describe('AgentAccountFormComponent', () => {
  let component: AgentAccountFormComponent;
  let fixture: ComponentFixture<AgentAccountFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentAccountFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
