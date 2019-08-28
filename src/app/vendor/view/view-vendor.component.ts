import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IntakeStatus } from 'src/app/models/enums/intake-status.enum';
import { IntakeForm } from 'src/app/models/intake-form.model';
import { Patient } from 'src/app/models/patient.model';
import { Physician } from 'src/app/models/physician.model';
import { Vendor } from 'src/app/models/vendor.model';
import { IntakeFormService } from 'src/app/services/api/intake-form.service';
import { PatientService } from 'src/app/services/api/patient.service';
import { PhysicianService } from 'src/app/services/api/physician.service';
import { VendorService } from 'src/app/services/api/vendor.service';
import { environment } from 'src/environments/environment';

import { AssignmentDialogComponent } from '../assignment-dialog/assignment-dialog.component';

export class TableRow {
  intakeFormId: number;
  physicianName: string;
  physicianState: string;
  patientName: string;
  patientState: string;
  status: IntakeStatus;
}

@Component({
  selector: 'app-view-vendor',
  templateUrl: './view-vendor.component.html',
  styleUrls: ['./view-vendor.component.scss']
})
export class ViewVendorComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;

  public vendor$: Observable<Vendor>;
  public datasource: MatTableDataSource<TableRow>;
  public IntakeStatus = IntakeStatus;

  public columnsToDisplay = ['intakeFormId', 'status', 'physicianName', 'physicianState', 'patientName', 'patientState', 'view', 'assign', 'download'];

  private vendorId: number;
  private intakes: IntakeForm[];
  private unsubscribe$ = new Subject();

  constructor(
    private readonly router: Router,
    private readonly physicianApi: PhysicianService,
    private readonly vendorApi: VendorService,
    private readonly patientApi: PatientService,
    private readonly intakeApi: IntakeFormService,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog) {
  }

  ngOnInit() {

    this.vendorId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.vendor$ = this.vendorApi.get(this.vendorId);

    this.intakeApi
      .getByVendor(this.vendorId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((intakes: IntakeForm[]) => {

        this.intakes = intakes;

        if (intakes.length > 0) {

          const physicianIds = intakes.filter(i => i.physicianId).map(({ physicianId }) => physicianId);
          const patientIds = intakes.filter(i => i.patientId).map(({ patientId }) => patientId);

          if (physicianIds.length > 0) {
            this.buildFullTable(intakes, physicianIds, patientIds);
          } else {
            this.buildPatientTable(intakes, patientIds);
          }
        }
      });

  }

  buildFullTable(intakes: IntakeForm[], physicianIds: number[], patientIds: number[]) {

    const patients$ = this.patientApi.getList(patientIds);
    const physicians$ = this.physicianApi.getList(physicianIds);

    forkJoin([physicians$, patients$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(responses => {

        const physicians = responses[0];
        const patients = responses[1];
        const data: TableRow[] = [];

        intakes.forEach((intake: IntakeForm) => {
          const physician = physicians.find(p => p.userAccount.userAccountId === intake.physicianId);
          const patient = patients.find(p => p.patientId === intake.patientId);
          const row = this.buildTableRow(intake, physician, patient);
          data.push(row);
        });

        this.datasource = new MatTableDataSource(data);
        this.datasource.sort = this.sort;

      });
  }

  buildPatientTable(intakes: IntakeForm[], patientIds: number[]) {

    this.patientApi
      .getList(patientIds)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((patients: Patient[]) => {
        const data: TableRow[] = [];

        intakes.forEach((intake: IntakeForm) => {
          const patient = patients.find(p => p.patientId === intake.patientId);
          const row = this.buildTableRow(intake, undefined, patient);
          data.push(row);
        });

        this.datasource = new MatTableDataSource(data);
        this.datasource.sort = this.sort;

      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  buildTableRow(intake: IntakeForm, physician?: Physician, patient?: Patient): TableRow {
    const row = new TableRow();
    row.intakeFormId = intake.intakeFormId;
    row.status = intake.status;

    if (patient) {
      row.patientName = patient.firstName + ' ' + patient.lastName;
      row.patientState = patient.address.state;
    }

    if (physician) {
      row.physicianName = physician.firstName + ' ' + physician.lastName;
      row.physicianState = physician.address.state;
    }

    return row;
  }

  assign(intakeFormId: number): void {
    const dialogRef = this.dialog.open(AssignmentDialogComponent, { data: { intakeFormId: intakeFormId } });
  }

  view(intakeFormId: number) {
    this.router.navigate(['vendor', this.vendorId, 'intake-document', intakeFormId]);
  }

  download(intakeFormId: number) {

    const intake = this.intakes.find(i => i.intakeFormId === intakeFormId);

    window.location.href = `${environment.api_url}/document/${intake.documentId}/download`;

    intake.status = IntakeStatus.Downloaded;

    this.intakeApi
      .put(intakeFormId, intake)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

}
