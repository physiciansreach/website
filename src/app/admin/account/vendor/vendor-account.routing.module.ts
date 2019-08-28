import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VendorCreateComponent } from './create/vendor-create.component';
import { VendorEditComponent } from './edit/vendor-edit.component';


const routes: Routes = [
  {
    path: 'create', component: VendorCreateComponent
  },
  {
    path: 'edit/:id', component: VendorEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
