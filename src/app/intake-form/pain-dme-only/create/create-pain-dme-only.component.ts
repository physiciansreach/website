import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouteUrls } from 'src/app/constants/routes';
import { IntakeForm } from 'src/app/models/intake-form.model';
import { IntakeFormService } from 'src/app/services/api/intake-form.service';

@Component({
  selector: 'app-create-pain-dme-only',
  templateUrl: './create-pain-dme-only.component.html',
  styleUrls: ['./create-pain-dme-only.component.scss']
})
export class CreatePainDmeOnlyComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  constructor(
    private readonly router: Router,
    private readonly intakeApi: IntakeFormService) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  onSubmit(intakes: IntakeForm[]) {

    const observables = [];

    intakes.forEach((intake: IntakeForm) => observables.push(this.intakeApi.post(intake)));

    // call the api for all the intake forms
    forkJoin(observables)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.router.navigateByUrl(RouteUrls.AgentDashboardComponent));
  }

}
