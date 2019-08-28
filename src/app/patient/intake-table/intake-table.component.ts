import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IntakeStatus } from 'src/app/models/enums/intake-status.enum';
import { IntakeForm } from 'src/app/models/intake-form.model';
import { IntakeFormService } from 'src/app/services/api/intake-form.service';

@Component({
  selector: 'app-intake-table',
  templateUrl: './intake-table.component.html',
  styleUrls: ['./intake-table.component.scss']
})
export class IntakeTableComponent implements OnInit, OnDestroy {

  @Input() patientId: number;
  @ViewChild(MatSort) sort: MatSort;

  private unsubscribe$ = new Subject();

  public dataSource: MatTableDataSource<IntakeForm>;
  public columnsToDisplay = ['intakeFormId', 'createdOn', 'status', 'edit'];

  // for the UI to use Enum values
  public IntakeStatus = IntakeStatus;

  constructor(
    private readonly router: Router,
    private readonly intakeFormApi: IntakeFormService) { }

  ngOnInit() {

    this.intakeFormApi
      .getByPatient(this.patientId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((intakeFormList: IntakeForm[]) => {
        this.dataSource = new MatTableDataSource(intakeFormList);
        this.dataSource.sort = this.sort;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  edit(intakeFormId: number) {
    this.router.navigate(['patient', this.patientId, 'pain-dme-only', intakeFormId, 'edit']);
  }
}
