import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DesignModule } from '../design/design.module';
import { PipesModule } from '../pipes/pipes.module';
import { CreatePatientComponent } from './create/create-patient.component';
import { EditPatientComponent } from './edit/edit.component';
import { IntakeTableComponent } from './intake-table/intake-table.component';
import { PatientFormComponent } from './patient-form/patient-form.component';


@NgModule({
  declarations: [
    CreatePatientComponent,
    EditPatientComponent,
    PatientFormComponent,
    IntakeTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DesignModule,
    PipesModule
  ]
})
export class PatientModule { }
