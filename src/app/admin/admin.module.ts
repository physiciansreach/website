import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DesignModule } from '../design/design.module';
import { PipesModule } from '../pipes/pipes.module';
import { AdminRoutingModule } from './admin.routing.module';
import { BillingDashboardComponent } from './billing/billing-dashboard/billing-dashboard.component';
import { PhysicianBillingComponent } from './billing/physician-billing/physician-billing.component';
import { VendorBillingComponent } from './billing/vendor-billing/vendor-billing.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { AdminListComponent } from './tables/admin-list/admin-list.component';
import { AgentListComponent } from './tables/agent-list/agent-list.component';
import { PatientListComponent } from './tables/patient-list/patient-list.component';
import { PhysicianListComponent } from './tables/physician-list/physician-list.component';
import { VendorListComponent } from './tables/vendor-list/vendor-list.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AgentListComponent,
    AdminListComponent,
    VendorListComponent,
    PhysicianListComponent,
    PatientListComponent,
    BillingDashboardComponent,
    VendorBillingComponent,
    PhysicianBillingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    DesignModule,
    PipesModule
  ]
})
export class AdminModule { }
