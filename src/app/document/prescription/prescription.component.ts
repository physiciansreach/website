import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SignatureType } from 'src/app/models/enums/signature-type';
import { IntakeForm } from 'src/app/models/intake-form.model';
import { Patient } from 'src/app/models/patient.model';
import { Physician } from 'src/app/models/physician.model';
import { Signature } from 'src/app/models/signature.model';

import { SignatureDialogComponent } from '../signature-dialog/signature-dialog.component';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit, OnDestroy {

  @Input() isAdminView = false;
  @Input() patient: Patient;
  @Input() physician: Physician;
  @Input() intakeForm: IntakeForm;
  @Input() product: string;

  @Output() formSubmitEvent = new EventEmitter<Signature>();

  public today = Date.now();
  public signature = new Signature();
  private unsubscribe$ = new Subject();

  constructor(private readonly dialog: MatDialog) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  getAnswer(key: string) {

    let text = '';
    const questions = this.intakeForm.questions.filter(q => q.key === key);

    if (questions.length > 0) {
      for (const answer of questions[0].answers) {
        text += answer.text;
      }
    }

    return text;
  }

  calcAge(): number {
    const timeDiff = Math.abs(Date.now() - (new Date(this.patient.dateOfBirth).getTime()));
    const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    return age;
  }

  sign() {
    this.dialog
      .open(SignatureDialogComponent)
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => this.signature.content = result);
  }

  approve() {
    this.signature.type = SignatureType.PrescriptionDocument;
    this.formSubmitEvent.emit(this.signature);
  }

  next() {
    this.formSubmitEvent.emit();
  }
}
