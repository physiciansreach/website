import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  {
    path: 'physician',
    loadChildren: () => import('./account/physician/physician-account.module').then(mod => mod.PhysicianAccountModule),
  },
  {
    path: 'agent',
    loadChildren: () => import('./account/agent/agent-account.module').then(mod => mod.AgentAccountModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./account/admin/admin-account.module').then(mod => mod.AdminAccountModule),
  },
  {
    path: 'vendor',
    loadChildren: () => import('./account/vendor/vendor-account.module').then(mod => mod.VendorAccountModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
