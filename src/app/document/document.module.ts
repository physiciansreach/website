import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignaturePadModule } from 'angular2-signaturepad';

import { DesignModule } from '../design/design.module';
import { PipesModule } from '../pipes/pipes.module';
import { DenyDialogComponent } from './deny-dialog/deny-dialog.component';
import { DocumentComponent } from './document.component';
import { IntakeComponent } from './intake/intake.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { SignatureDialogComponent } from './signature-dialog/signature-dialog.component';

@NgModule({
  declarations: [
    DocumentComponent,
    IntakeComponent,
    PrescriptionComponent,
    SignatureDialogComponent,
    DenyDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DesignModule,
    PipesModule,
    SignaturePadModule
  ],
  entryComponents: [
    SignatureDialogComponent,
    DenyDialogComponent
  ]
})
export class DocumentModule { }
