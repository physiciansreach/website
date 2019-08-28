import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { flatMap, map, takeUntil } from 'rxjs/operators';
import { IntakeStatus } from 'src/app/models/enums/intake-status.enum';
import { IntakeForm } from 'src/app/models/intake-form.model';
import { Physician } from 'src/app/models/physician.model';
import { IntakeFormService } from 'src/app/services/api/intake-form.service';
import { PhysicianService } from 'src/app/services/api/physician.service';

export class AssignmentDialogData {
  intakeFormId: number;
}

@Component({
  selector: 'app-assignment-dialog',
  templateUrl: './assignment-dialog.component.html',
  styleUrls: ['./assignment-dialog.component.scss']
})
export class AssignmentDialogComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public physicians$: Observable<Physician[]>;
  public intake$: Observable<IntakeForm>;
  private unsubscribe$ = new Subject();

  constructor(
    private readonly physicianApi: PhysicianService,
    private readonly intakeApi: IntakeFormService,
    public dialogRef: MatDialogRef<AssignmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AssignmentDialogData) { }

  ngOnInit() {

    // get physicians and filter them so only active show.
    this.physicians$ = this.physicianApi
      .getAll()
      .pipe(map(physician => physician.filter(p => p.userAccount.active)));

    this.intake$ = this.intakeApi.get(this.data.intakeFormId);

    this.form = new FormGroup({
      physician: new FormControl('', Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save() {

    const physicianId = this.form.controls['physician'].value;

    this.intake$
      .pipe(
        takeUntil(this.unsubscribe$),
        flatMap((intake: IntakeForm) => {

          intake.physicianId = physicianId;
          intake.status = IntakeStatus.Assigned;
          return this.intakeApi.put(intake.intakeFormId, intake);

        }))
      .subscribe(() => this.dialogRef.close());

  }
}
