import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DesignModule } from '../design/design.module';
import { AgentDashboardComponent } from './dashboard/agent-dashboard.component';



@NgModule({
  declarations: [
    AgentDashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DesignModule
  ]
})
export class AgentModule { }
