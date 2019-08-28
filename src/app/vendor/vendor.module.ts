import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DesignModule } from '../design/design.module';
import { PipesModule } from '../pipes/pipes.module';
import { AssignmentDialogComponent } from './assignment-dialog/assignment-dialog.component';
import { SendEmailDialogComponent } from './send-email-dialog/send-email-dialog.component';
import { ViewVendorComponent } from './view/view-vendor.component';

@NgModule({
  declarations: [
    ViewVendorComponent,
    AssignmentDialogComponent,
    SendEmailDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DesignModule,
    PipesModule
  ],
  entryComponents: [
    AssignmentDialogComponent
  ]
})
export class VendorModule { }
