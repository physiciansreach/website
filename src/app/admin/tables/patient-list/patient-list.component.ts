import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouteUrls } from 'src/app/constants/routes';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/api/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit, OnDestroy {


  @ViewChild(MatSort) sort: MatSort;

  private unsubscribe$ = new Subject();

  public datasource: MatTableDataSource<Patient>;
  public columnsToDisplay = ['patientId', 'createdOn', 'firstName', 'lastName', 'edit'];

  constructor(
    private readonly patientApi: PatientService,
    private readonly router: Router) { }

  ngOnInit() {
    this.patientApi
      .getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((patientList: Patient[]) => {
        this.datasource = new MatTableDataSource(patientList);
        this.datasource.sort = this.sort;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  edit(agentId: number, patientId: number) {
    this.router.navigate(['agent', agentId, 'patient', patientId]);
  }

  add() {
    this.router.navigateByUrl(RouteUrls.PatientCreateComponent);
  }
}
