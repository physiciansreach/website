import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PhysicianCreateComponent } from './create/physician-create.component';
import { PhysicianEditComponent } from './edit/physician-edit.component';
import { PhysicianAccountFormComponent } from './form/physician-account-form.component';
import { PhysicianRoutingModule } from './physician-account.routing.module';
import { DesignModule } from 'src/app/design/design.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [
    PhysicianCreateComponent,
    PhysicianEditComponent,
    PhysicianAccountFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DesignModule,
    PipesModule,
    PhysicianRoutingModule
  ]
})
export class PhysicianAccountModule { }
