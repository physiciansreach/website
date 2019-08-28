import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange, MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SignatureDialogComponent } from 'src/app/document/signature-dialog/signature-dialog.component';
import { SignatureType } from 'src/app/models/enums/signature-type';
import { ICD10Code } from 'src/app/models/icd10-code.model';
import { IntakeForm } from 'src/app/models/intake-form.model';
import { Patient } from 'src/app/models/patient.model';
import { Physician } from 'src/app/models/physician.model';
import { Signature } from 'src/app/models/signature.model';

@Component({
  selector: 'app-intake',
  templateUrl: './intake.component.html',
  styleUrls: ['./intake.component.scss']
})
export class IntakeComponent implements OnInit, OnDestroy {

  @Input() isAdminView = true;
  @Input() patient: Patient;
  @Input() physician: Physician;
  @Input() intakeForm: IntakeForm;
  @Input() diagnosisOptions: string[] = [];

  @Output() formSubmitEvent = new EventEmitter<{ intakeForm: IntakeForm, signature: Signature } | null>();

  public form: FormGroup;
  public today = Date.now();
  public signatureData: string;
  public diagnosisSelections: string[] = [];

  private unsubscribe$ = new Subject();

  constructor(private readonly dialog: MatDialog) {

  }

  ngOnInit() {

    this.form = new FormGroup({
      diagnosis_other: new FormControl(''),
      additional_notes: new FormControl('', Validators.maxLength(500)),
      duration_default: new FormControl(true),
      duration_other: new FormControl(''),
      signature: new FormControl(['', Validators.required])
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  calcAge(): number {
    const timeDiff = Math.abs(Date.now() - (new Date(this.patient.dateOfBirth).getTime()));
    const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    return age;
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

  onDiagnosisCheck(event: MatCheckboxChange, index: number) {
    if (event.checked) {
      this.diagnosisSelections.push(this.diagnosisOptions[index]);
    } else {
      this.diagnosisSelections = this.diagnosisSelections.filter(obj => obj !== this.diagnosisOptions[index]);
    }
  }

  sign() {
    this.dialog
      .open(SignatureDialogComponent)
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => this.signatureData = result);
  }

  approve() {

    const diagnosis_other = this.form.controls['diagnosis_other'].value;
    if (diagnosis_other) {
      this.diagnosisSelections.push(diagnosis_other);
    }

    let duration = this.form.controls['duration_default'].value;

    if (duration) {
      duration = '99 PRN'; // default value
    } else {
      duration = this.form.controls['duration_other'].value;
    }

    if (!this.form.valid || !duration || this.diagnosisSelections.length === 0 || this.diagnosisSelections.length === 0 || !this.signatureData) {
      return;
    }

    this.intakeForm.icD10Codes = [];
    for (const option of this.diagnosisSelections) {
      const code = new ICD10Code();
      code.text = option;
      this.intakeForm.icD10Codes.push(code);
    }

    this.intakeForm.duration = duration;
    this.intakeForm.physicianNotes = this.form.controls['additional_notes'].value;

    const signature = new Signature();
    signature.content = this.signatureData;
    signature.type = SignatureType.IntakeDocument;

    this.formSubmitEvent.emit({ intakeForm: this.intakeForm, signature: signature });
  }

  next() {
    this.formSubmitEvent.emit();
  }

}
