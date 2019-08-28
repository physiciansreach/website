import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DesignModule } from 'src/app/design/design.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { AgentRoutingModule } from './agent-account.routing.module';
import { AgentCreateComponent } from './create/agent-create.component';
import { AgentEditComponent } from './edit/agent-edit.component';
import { AgentAccountFormComponent } from './form/agent-account-form.component';

@NgModule({
  declarations: [
    AgentCreateComponent,
    AgentEditComponent,
    AgentAccountFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DesignModule,
    PipesModule,
    AgentRoutingModule
  ]
})
export class AgentAccountModule { }
