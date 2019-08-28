import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Agent } from 'src/app/models/agent.model';
import { AgentService } from 'src/app/services/api/agent.service';
import { VendorService } from 'src/app/services/api/vendor.service';

@Component({
  selector: 'app-agent-create',
  templateUrl: './agent-create.component.html',
  styleUrls: ['./agent-create.component.scss']
})
export class AgentCreateComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();
  public vendors$ = this.vendorApi.getAll();

  constructor(
    private readonly agentApi: AgentService,
    private readonly vendorApi: VendorService,
    private readonly router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  onSubmit(agent: Agent) {
    this.agentApi
      .post(agent)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.router.navigate(['/admin']));
  }
}
