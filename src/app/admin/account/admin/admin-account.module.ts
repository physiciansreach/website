import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DesignModule } from 'src/app/design/design.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { AdminRoutingModule } from './admin-account.routing.module';
import { AdminCreateComponent } from './create/admin-create.component';
import { AdminEditComponent } from './edit/admin-edit.component';
import { AdminAccountFormComponent } from './form/admin-account-form.component';


@NgModule({
  declarations: [
    AdminCreateComponent,
    AdminEditComponent,
    AdminAccountFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DesignModule,
    PipesModule,
    AdminRoutingModule
  ]
})
export class AdminAccountModule { }
