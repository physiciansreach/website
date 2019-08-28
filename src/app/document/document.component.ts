import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RouteUrls } from '../constants/routes';
import { Document } from '../models/document.model';
import { AccountType } from '../models/enums/account-type.enum';
import { InsuranceType } from '../models/enums/insurance-type.enum';
import { IntakeStatus } from '../models/enums/intake-status.enum';
import { ICD10Code } from '../models/icd10-code.model';
import { IntakeForm } from '../models/intake-form.model';
import { Patient } from '../models/patient.model';
import { Physician } from '../models/physician.model';
import { Signature } from '../models/signature.model';
import { UserAccount } from '../models/user-account.model';
import { DocumentService } from '../services/api/document.service';
import { IntakeFormService } from '../services/api/intake-form.service';
import { PatientService } from '../services/api/patient.service';
import { PhysicianService } from '../services/api/physician.service';
import { SignatureService } from '../services/api/signature.service';
import { SessionService } from '../services/session.service';
import { DenyDialogComponent } from './deny-dialog/deny-dialog.component';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {

  private intakeFormId: number;
  private vendorId: number;

  public isAdminView = false;
  public IntakeStatus = IntakeStatus;
  public patient: Patient;
  public physician: Physician;
  public intakeForm: IntakeForm;
  public diagnosisOptions: string[] = [];

  private intakeSignature: Signature;
  private prescriptionSignature: Signature;
  private unsubscribe$ = new Subject();

  public intakeApproved = false;

  constructor(
    private readonly dialog: MatDialog,
    private readonly session: SessionService,
    private readonly patientApi: PatientService,
    private readonly physicianApi: PhysicianService,
    private readonly intakeFormApi: IntakeFormService,
    private readonly signatureApi: SignatureService,
    private readonly documentApi: DocumentService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) {
  }

  ngOnInit() {

    this.intakeFormId = parseInt(this.route.snapshot.paramMap.get('intakeFormId'), 10);

    if (this.route.snapshot.paramMap.has('vendorId')) {
      this.vendorId = parseInt(this.route.snapshot.paramMap.get('vendorId'), 10);
    }

    this.session.userAccount$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((account: UserAccount) => {

        this.isAdminView = (account.type === AccountType.Admin);

        this.loadIntakeForm();
      });

  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  private loadIntakeForm() {

    this.intakeFormApi
      .get(this.intakeFormId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((intake: IntakeForm) => {

        // load intake
        this.intakeForm = intake;

        // change intake status to under review is the physician is viewing it.
        if (!this.isAdminView && this.intakeForm.status === IntakeStatus.Assigned) {
          this.intakeForm.status = IntakeStatus.UnderReview;

          this.intakeFormApi
            .put(this.intakeFormId, this.intakeForm)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe();
        }

        // load patient
        if (intake.patientId) {
          this.patientApi
            .get(intake.patientId)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((patient: Patient) => this.patient = patient);
        }

        // load physician
        if (intake.physicianId) {
          this.physicianApi
            .get(intake.physicianId)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((physician: Physician) => this.physician = physician);
        }

        // kind of ghetto infering all this but for now it works.
        const question = this.intakeForm.questions.filter(q => q.key === 'painArea');
        const painArea = question[0].answers[0].text;

        // the product, lcode and diagnosis options are all distinct via the PainArea
        this.setDiagnosis(painArea);

      });
  }

  onIntakeApproval(data: { intakeForm: IntakeForm, signature: Signature }) {

    if (data) {
      this.intakeForm = data.intakeForm;
      this.intakeSignature = data.signature;
    } else {

      // set these to the defaults so the next page will display everything
      this.intakeForm.icD10Codes = [];
      for (const option of this.diagnosisOptions) {
        const code = new ICD10Code();
        code.text = option;
        this.intakeForm.icD10Codes.push(code);
      }

      this.intakeForm.duration = '';
    }
    this.intakeApproved = true;
  }

  onPrescriptionApproval(signature: Signature) {
    if (this.isAdminView) {
      this.router.navigate(['vendor', this.vendorId, 'view']);
    } else {

      this.prescriptionSignature = signature;
      this.intakeForm.status = IntakeStatus.Approved;

      // setup doc to be generated last
      const doc = new Document();
      doc.intakeFormId = this.intakeFormId;

      const intakeObv$ = this.intakeFormApi.put(this.intakeFormId, this.intakeForm);
      const sig1Obv$ = this.signatureApi.put(this.intakeFormId, this.intakeSignature);
      const sig2Obv$ = this.signatureApi.put(this.intakeFormId, this.prescriptionSignature);
      const docObv$ = this.documentApi.post(doc);

      // run all methods in order
      concat(intakeObv$, sig1Obv$, sig2Obv$, docObv$)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.router.navigate([RouteUrls.PhysicianDashboardComponent]);
        });
    }
  }

  deny() {
    this.dialog
      .open(DenyDialogComponent)
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result: string) => {
        this.intakeForm.deniedReason = result;
        this.intakeForm.status = IntakeStatus.Denied;

        this.intakeFormApi.put(this.intakeFormId, this.intakeForm).subscribe(() => {
          this.router.navigate([RouteUrls.PhysicianDashboardComponent]);
        });

      });

  }

  private setDiagnosis(key: string) {

    switch (key.toUpperCase()) {
      case 'RIGHT ANKLE':
        this.intakeForm.product = 'Ankle Brace';
        this.diagnosisOptions.push('m19.071 primary osteoarthritis, right ankle and foot');
        this.diagnosisOptions.push('m25.579 pain in joint, ankle');
        this.diagnosisOptions.push('m25.571 pain in right ankle and joints of right foot');
        this.diagnosisOptions.push('m25.371 instability in right ankle');
        this.intakeForm.hcpcsCode = 'L1906 Ankle Foot Orthosis, Plastic or Other Material With Ankle Joint, Prefabricated, Includes Fitting and Adjustment';
        break;
      case 'LEFT ANKLE':
        this.intakeForm.product = 'Ankle Brace';
        this.diagnosisOptions.push('m19.072 primary osteoarthritis, left ankle and foot');
        this.diagnosisOptions.push('m25.579 pain in joint, ankle');
        this.diagnosisOptions.push('m25.572 pain in left ankle and joints of left foot');
        this.diagnosisOptions.push('m25.372 instability left ankle');
        this.intakeForm.hcpcsCode = 'L1906 Ankle Foot Orthosis, Plastic or Other Material With Ankle Joint, Prefabricated, Includes Fitting and Adjustment';
        break;
      case 'RIGHT KNEE ':
        this.intakeForm.product = 'Knee Brace';
        this.diagnosisOptions.push('m17.11 unilateral osteoarthritis of the right knee');
        this.diagnosisOptions.push('m23.51 chronic instability of the right knee');

        if (this.patient.insurance === InsuranceType.PRIVATE) {
          this.intakeForm.hcpcsCode = 'L1833 (Hinged Wraparound Knee Support)';
        } else {
          this.intakeForm.hcpcsCode = 'L2397 (Universal Suspension Sleeve for ROM Hinged Knee Braces)';
        }

        break;
      case 'LEFT KNEE':
        this.intakeForm.product = 'Knee Brace';
        this.diagnosisOptions.push('m17.12 unilateral osteoarthritis of left knee');
        this.diagnosisOptions.push('m23.52 chronic instability of the left knee');

        if (this.patient.insurance === InsuranceType.PRIVATE) {
          this.intakeForm.hcpcsCode = 'L1833 (Hinged Wraparound Knee Support)';
        } else {
          this.intakeForm.hcpcsCode = 'L2397 (Universal Suspension Sleeve for ROM Hinged Knee Braces)';
        }

        break;
      case 'RIGHT WRIST':
        this.intakeForm.product = 'Wrist Brace';
        this.diagnosisOptions.push('m19.031 primary osteoarthritis, right wrist');
        this.diagnosisOptions.push('g56.0 carpal tunnel syndrome');
        this.diagnosisOptions.push('m19.041 osteoarthritis right hand');
        this.intakeForm.hcpcsCode = 'L3908 wrist hand orthosis, includes one or more non-torsional joint(s), elastic bands, turnbuckles, may include a soft interface and straps. it is prefabricated and off the shelf.';
        break;
      case 'LEFT WRIST':
        this.intakeForm.product = 'Wrist Brace';
        this.diagnosisOptions.push('m19.032 primary osteoarthritis, left wrist');
        this.diagnosisOptions.push('g56.0 carpal tunnel syndrome');
        this.diagnosisOptions.push('m19.042 osteoarthritis left hand');
        this.intakeForm.hcpcsCode = 'L3908 wrist hand orthosis, includes one or more non-torsional joint(s), elastic bands, turnbuckles, may include a soft interface and straps. it is prefabricated and off the shelf.';
        break;
      case 'RIGHT ELBOW':
        this.intakeForm.product = 'Elbow Brace';
        this.diagnosisOptions.push('m24.221 disorder of ligament, right elbow');
        this.diagnosisOptions.push('m12.821 other specific arthropathy, not elsewhere specified, right elbow');
        this.diagnosisOptions.push('m12.821 pain in right elbow');
        this.diagnosisOptions.push('g89.4 chronic pain');
        this.intakeForm.hcpcsCode = 'L3761 Elbow Orthosis, With Adjustable Position Locking Joint(s), Prefabricated, Includes Fitting and Adjustments, Any Type.';
        break;
      case 'LEFT ELBOW':
        this.intakeForm.product = 'Elbow Brace';
        this.diagnosisOptions.push('m24.221 disorder of ligament, left  elbow');
        this.diagnosisOptions.push('m12.821 other specific arthropathy, not elsewhere specified, left elbow');
        this.diagnosisOptions.push('m25.521 pain in left elbow');
        this.diagnosisOptions.push('g89.4 chronic pain');
        this.intakeForm.hcpcsCode = 'L3761 Elbow Orthosis, With Adjustable Position Locking Joint(s), Prefabricated, Includes Fitting and Adjustments, Any Type.';
        break;
      case 'RIGHT SHOULDER':
        this.intakeForm.product = 'Shoulder Brace';
        this.diagnosisOptions.push('m25.511 pain in right shoulder');
        this.diagnosisOptions.push('m19.011 primary osteoarthritis, right shoulder');
        this.intakeForm.hcpcsCode = 'L3960 (Shoulder Elbow Wrist Hand Orthosis, Abduction Positioning, Airplane Design, Prefabricated, Includes Fitting and Adjustment.)';
        break;
      case 'LEFT SHOULDER':
        this.intakeForm.product = 'Shoulder Brace';
        this.diagnosisOptions.push('m25.512 pain in left shoulder ');
        this.diagnosisOptions.push('m19.012 primary osteoarthritis, left shoulder');
        this.intakeForm.hcpcsCode = 'L3960(Shoulder Elbow Wrist Hand Orthosis, Abduction Positioning, Airplane Design, Prefabricated, Includes Fitting and Adjustment.)';
        break;
      case 'BACK':
        this.intakeForm.product = 'Back Brace';
        this.diagnosisOptions.push('m54.5 low back pain');
        this.diagnosisOptions.push('m53.2x7 spinal instabilities, lumbosacral region');
        this.diagnosisOptions.push('g89.4 chronic pain');
        this.diagnosisOptions.push('m51.36 lumbar disc degeneration');
        this.intakeForm.hcpcsCode = 'L0650 (Lumbar-sacral orthosis. Sagittal control with rigid anterior and posterior panels, posterior panels, posterior extends from Sacrococcygeal junction to the T-9 vertebra, lateral strength, with rigid lateral panels, prefabricated and off the shelf. Custom fitting of the orthosis is not required and the patient or an assisting care giver can apply the prescribed orthotic device with minimal self-adjusting.)';
        break;
    }
  }

}
