import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BillingDashboardComponent } from './admin/billing/billing-dashboard/billing-dashboard.component';
import { AgentDashboardComponent } from './agent/dashboard/agent-dashboard.component';
import { RouteUrls } from './constants/routes';
import { DocumentComponent } from './document/document.component';
import { CreatePainDmeOnlyComponent } from './intake-form/pain-dme-only/create/create-pain-dme-only.component';
import { EditPainDmeOnlyComponent } from './intake-form/pain-dme-only/edit/edit-pain-dme-only.component';
import { AccountType } from './models/enums/account-type.enum';
import { CreatePatientComponent } from './patient/create/create-patient.component';
import { EditPatientComponent } from './patient/edit/edit.component';
import { PhysicianDashboardComponent } from './physician/dashboard/physician-dashboard.component';
import { RoleGuardService } from './services/role-guard.service';
import { SignInGuardService } from './services/sign-in-guard.service';
import { ViewVendorComponent } from './vendor/view/view-vendor.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
    canActivate: [RoleGuardService, SignInGuardService],
    data: { expectedRoles: [AccountType.Admin] }
  },
  {
    path: RouteUrls.VendorIntakeDocumentComponent, component: DocumentComponent,
    canActivate: [RoleGuardService, SignInGuardService],
    data: { expectedRoles: [AccountType.Admin] }
  },
  {
    path: RouteUrls.BillingDashboardComponent, component: BillingDashboardComponent,
    canActivate: [RoleGuardService, SignInGuardService],
    data: { expectedRoles: [AccountType.Admin] }
  },
  {
    path: RouteUrls.PhysicianIntakeDocumentComponent, component: DocumentComponent,
    canActivate: [RoleGuardService, SignInGuardService],
    data: { expectedRoles: [AccountType.Physician] }
  },
  {
    path: RouteUrls.CreatePainDmeOnlyComponent, component: CreatePainDmeOnlyComponent,
    canActivate: [RoleGuardService, SignInGuardService],
    data: { expectedRoles: [AccountType.Agent] }
  },
  {
    path: RouteUrls.EditPainDmeOnlyComponent, component: EditPainDmeOnlyComponent,
    canActivate: [RoleGuardService, SignInGuardService],
    data: { expectedRoles: [AccountType.Agent, AccountType.Admin] }
  },
  {
    path: RouteUrls.PatientCreateComponent, component: CreatePatientComponent,
    canActivate: [RoleGuardService, SignInGuardService],
    data: { expectedRoles: [AccountType.Agent] }
  },
  {
    path: RouteUrls.PatientEditComponent, component: EditPatientComponent,
    canActivate: [RoleGuardService, SignInGuardService],
    data: { expectedRoles: [AccountType.Agent, AccountType.Admin] }
  },
  {
    path: RouteUrls.AgentDashboardComponent, component: AgentDashboardComponent,
    canActivate: [RoleGuardService, SignInGuardService],
    data: { expectedRoles: [AccountType.Agent] }
  },
  {
    path: RouteUrls.PhysicianDashboardComponent, component: PhysicianDashboardComponent,
    canActivate: [RoleGuardService, SignInGuardService],
    data: { expectedRoles: [AccountType.Physician] }
  },
  {
    path: RouteUrls.VendorViewComponent, component: ViewVendorComponent,
    canActivate: [RoleGuardService, SignInGuardService],
    data: { expectedRoles: [AccountType.Admin] }
  },
  {
    path: '**',
    loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule),
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
