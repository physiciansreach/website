import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AdminStoreService } from '../store/admin-store.service';
import { AgentStoreService } from '../store/agent-store.service';
import { PatientStoreService } from '../store/patient-store.service';
import { PhysicianStoreService } from '../store/physician-store.service ';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private readonly agentStore: AgentStoreService,
    private readonly adminStore: AdminStoreService,
    private readonly physicianStore: PhysicianStoreService,
    private readonly patientStore: PatientStoreService,
    private readonly session: SessionService,
    private readonly router: Router
  ) { }

  logout() {
    localStorage.removeItem('jwt');
    this.session.clear();
    this.agentStore.clear();
    this.adminStore.clear();
    this.physicianStore.clear();
    this.patientStore.clear();
    this.router.navigate(['/login']);
  }
}
