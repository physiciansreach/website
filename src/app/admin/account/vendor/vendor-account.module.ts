import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DesignModule } from 'src/app/design/design.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { VendorCreateComponent } from './create/vendor-create.component';
import { VendorEditComponent } from './edit/vendor-edit.component';
import { VendorAccountFormComponent } from './form/vendor-account-form.component';
import { VendorRoutingModule } from './vendor-account.routing.module';


@NgModule({
  declarations: [
    VendorCreateComponent,
    VendorEditComponent,
    VendorAccountFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DesignModule,
    PipesModule,
    VendorRoutingModule
  ]
})
export class VendorAccountModule { }
