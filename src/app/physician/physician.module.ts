import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DesignModule } from '../design/design.module';
import { PipesModule } from '../pipes/pipes.module';
import { PhysicianDashboardComponent } from './dashboard/physician-dashboard.component';


@NgModule({
  declarations: [
    PhysicianDashboardComponent
  ],
  imports: [
    CommonModule,
    DesignModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class PhysicianModule { }
