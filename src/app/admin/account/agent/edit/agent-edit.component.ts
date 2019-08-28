import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Agent } from 'src/app/models/agent.model';
import { AgentService } from 'src/app/services/api/agent.service';
import { VendorService } from 'src/app/services/api/vendor.service';


@Component({
  selector: 'app-agent-edit',
  templateUrl: './agent-edit.component.html',
  styleUrls: ['./agent-edit.component.scss']
})
export class AgentEditComponent implements OnInit, OnDestroy {

  public vendors$ = this.vendorApi.getAll();
  public agent$: Observable<Agent>;

  private id: number;
  private unsubscribe$ = new Subject();

  constructor(
    private readonly agentApi: AgentService,
    private readonly vendorApi: VendorService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.agent$ = this.agentApi.get(this.id);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  onSubmit(agent: Agent) {
    this.agentApi
      .put(this.id, agent)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.router.navigate(['/admin']));
  }
}
