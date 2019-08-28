import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IntakeStatus } from 'src/app/models/enums/intake-status.enum';
import { IntakeForm } from 'src/app/models/intake-form.model';
import { UserAccount } from 'src/app/models/user-account.model';
import { IntakeFormService } from 'src/app/services/api/intake-form.service';
import { SessionService } from 'src/app/services/session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-physician-dashboard',
  templateUrl: './physician-dashboard.component.html',
  styleUrls: ['./physician-dashboard.component.scss']
})
export class PhysicianDashboardComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;

  private unsubscribe$ = new Subject();
  private physicianId: number;

  public dataSource: MatTableDataSource<IntakeForm>;
  public columnsToDisplay = ['intakeFormId', 'createdOn', 'status', 'view', 'download'];

  // for the UI to use Enum values
  public IntakeStatus = IntakeStatus;

  constructor(
    private readonly router: Router,
    private readonly session: SessionService,
    private readonly intakeFormApi: IntakeFormService) { }

  ngOnInit() {

    this.session.userAccount$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((account: UserAccount) => {
        this.physicianId = account.userAccountId;

        this.intakeFormApi
          .getByPhysician(account.userAccountId)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((intakeFormList: IntakeForm[]) => {
            this.dataSource = new MatTableDataSource(intakeFormList);
            this.dataSource.sort = this.sort;
          });

      });

  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  download(documentId: number) {
    window.location.href = `${environment.api_url}/document/${documentId}/download`;
  }

  view(intakeFormId: number) {
    this.router.navigate(['physician', this.physicianId, 'intake-document', intakeFormId]);
  }

}
