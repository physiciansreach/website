import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhysicianCreateComponent } from './create/physician-create.component';
import { PhysicianEditComponent } from './edit/physician-edit.component';

const routes: Routes = [
  {
    path: 'create', component: PhysicianCreateComponent
  },
  {
    path: 'edit/:id', component: PhysicianEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhysicianRoutingModule { }
