import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouteUrls } from 'src/app/constants/routes';
import { AccountType } from 'src/app/models/enums/account-type.enum';
import { Patient } from 'src/app/models/patient.model';
import { UserAccount } from 'src/app/models/user-account.model';
import { PatientService } from 'src/app/services/api/patient.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditPatientComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();
  public patient$: Observable<Patient>;
  public patientId: number;

  private isAdmin = false;

  constructor(
    private readonly session: SessionService,
    private readonly patientApi: PatientService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit() {
    this.patientId = parseInt(this.route.snapshot.paramMap.get('patientId'), 10);
    this.patient$ = this.patientApi.get(this.patientId);

    this.session.userAccount$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result: UserAccount) => this.isAdmin = result.type === AccountType.Admin);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  onSubmit(patient: Patient) {

    this.patientApi
      .put(this.patientId, patient)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {

        if (this.isAdmin) {
          this.router.navigateByUrl('admin');
        } else {
          this.router.navigateByUrl(RouteUrls.AgentDashboardComponent);
        }
      });
  }

}
