import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminCreateComponent } from './create/admin-create.component';
import { AdminEditComponent } from './edit/admin-edit.component';

const routes: Routes = [
  {
    path: 'create', component: AdminCreateComponent
  },
  {
    path: 'edit/:id', component: AdminEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
