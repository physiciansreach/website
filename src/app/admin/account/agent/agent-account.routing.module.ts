import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgentCreateComponent } from './create/agent-create.component';
import { AgentEditComponent } from './edit/agent-edit.component';

const routes: Routes = [
  {
    path: 'create', component: AgentCreateComponent
  },
  {
    path: 'edit/:id', component: AgentEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
