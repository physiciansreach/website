import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouteUrls } from 'src/app/constants/routes';
import { Agent } from 'src/app/models/Agent.model';
import { IntakeStatus } from 'src/app/models/enums/intake-status.enum';
import { IntakeForm } from 'src/app/models/intake-form.model';
import { Patient } from 'src/app/models/patient.model';
import { Vendor } from 'src/app/models/vendor.model';
import { AgentService } from 'src/app/services/api/agent.service';
import { IntakeFormService } from 'src/app/services/api/intake-form.service';
import { PatientService } from 'src/app/services/api/patient.service';
import { VendorService } from 'src/app/services/api/vendor.service';
import { environment } from 'src/environments/environment';


export class TableRow {
  intakeFormId: number;
  documentId: number;
  createdOn: string;
  status: IntakeStatus;
  patientName: string;
  patientState: string;
  agentName: string;
  vendorName: string;
  vendorBilled: boolean;
  vendorPaid: boolean;
}


@Component({
  selector: 'app-vendor-billing',
  templateUrl: './vendor-billing.component.html',
  styleUrls: ['./vendor-billing.component.scss']
})
export class VendorBillingComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;

  // for the UI to access Enum
  public IntakeStatus = IntakeStatus;

  private intakes: IntakeForm[];
  private changes: IntakeForm[] = [];
  private unsubscribe$ = new Subject();
  public datasource: MatTableDataSource<TableRow>;
  public columnsToDisplay = ['intakeFormId', 'createdOn', 'status', 'patientName', 'patientState', 'vendorName', 'agentName', 'vendorBilled', 'vendorPaid', 'download'];

  constructor(
    private readonly router: Router,
    private readonly intakeApi: IntakeFormService,
    private readonly patientApi: PatientService,
    private readonly vendorApi: VendorService,
    private readonly agentApi: AgentService
  ) { }

  ngOnInit() {

    // play it loose and get them all!
    // implement server side filtering when this gets slow
    const intakes$ = this.intakeApi.getAll();
    const vendors$ = this.vendorApi.getAll();
    const agents$ = this.agentApi.getAll();

    forkJoin([intakes$, vendors$, agents$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {

        const intakes = results[0].filter(v => v.status >= IntakeStatus.Approved);
        const vendors = results[1];
        const agents = results[2];

        if (intakes.length > 0) {

          this.intakes = intakes;
          const patientIds = intakes.map(({ patientId }) => patientId);

          // only get patients associated with the Approved intake forms
          const patients$ = this.patientApi.getList(patientIds);

          patients$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((patients: Patient[]) => {

              const data: TableRow[] = [];

              intakes.forEach((intake: IntakeForm) => {

                const patient = patients.find(p => p.patientId === intake.patientId);
                const agent = agents.find(a => a.userAccount.userAccountId === patient.agentId);
                const vendor = vendors.find(v => v.vendorId === agent.vendorId);

                const row = this.buildTableRow(intake, patient, agent, vendor);

                data.push(row);
              });

              this.datasource = new MatTableDataSource(data);
              this.datasource.sort = this.sort;

            });

        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  paid(event: MatCheckboxChange, intakeFormId: number) {

    const change = this.changes.find((intake: IntakeForm) => intake.intakeFormId === intakeFormId);

    if (change) {
      change.vendorPaid = event.checked;
      const index = this.changes.indexOf(change);
      this.changes[index] = change;
    } else {
      const newChange = this.intakes.find((intake: IntakeForm) => intake.intakeFormId === intakeFormId);
      newChange.vendorPaid = event.checked;
      this.changes.push(newChange);
    }
  }

  billed(event: MatCheckboxChange, intakeFormId: number) {

    const change = this.changes.find((intake: IntakeForm) => intake.intakeFormId === intakeFormId);

    if (change) {
      change.vendorBilled = event.checked;
      const index = this.changes.indexOf(change);
      this.changes[index] = change;
    } else {
      const newChange = this.intakes.find((intake: IntakeForm) => intake.intakeFormId === intakeFormId);
      newChange.vendorBilled = event.checked;
      this.changes.push(newChange);
    }
  }

  save() {

    const observables = [];

    this.changes.forEach((intake: IntakeForm) => observables.push(this.intakeApi.put(intake.intakeFormId, intake)));

    forkJoin(observables)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.router.navigateByUrl('admin'));
  }


  download(documentId: number) {
    window.location.href = `${environment.api_url}/document/${documentId}/download`;
  }

  private buildTableRow(intake: IntakeForm, patient: Patient, agent: Agent, vendor: Vendor): TableRow {
    const row = new TableRow();
    row.intakeFormId = intake.intakeFormId;
    row.documentId = intake.documentId;
    row.status = intake.status;
    row.patientName = patient.firstName + ' ' + patient.lastName;
    row.patientState = patient.address.state;
    row.vendorName = vendor.companyName;
    row.agentName = agent.firstName + ' ' + agent.lastName;
    row.vendorPaid = intake.vendorPaid;
    row.vendorBilled = intake.vendorBilled;
    row.createdOn = intake.createdOn;

    return row;
  }


}
