import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { States } from 'src/app/constants/states';
import { Address } from 'src/app/models/address.model';
import { CallbackTime } from 'src/app/models/enums/callback-time.enum';
import { InsuranceType } from 'src/app/models/enums/insurance-type.enum';
import { LanguageType } from 'src/app/models/enums/language-type.enum';
import { SexType } from 'src/app/models/enums/sex-type.enum';
import { TherapyType } from 'src/app/models/enums/therapy-type.enum';
import { Medicare } from 'src/app/models/medicare.model';
import { Patient } from 'src/app/models/patient.model';
import { PrivateInsurance } from 'src/app/models/private-insurance.model';
import { FormatHelperService } from 'src/app/services/format-helper.service';
import { FormHelperService } from 'src/app/services/forms-helper.service';
import { LookupService } from 'src/app/services/lookupservice';
import { MaskService } from 'src/app/services/mask.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

export interface PainArea {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit, OnDestroy {

  @Input() patient$: Observable<Patient>;
  @Input() patientId: number;
  @Output() formSubmitEvent = new EventEmitter<Patient>();

  private unsubscribe$ = new Subject();
  private agentId: number;

  public form: FormGroup;
  public states = States;
  public shoeSizes: string[] = LookupService.shoeSizes;
  public heights: string[] = LookupService.heights;

  public painAreas: PainArea[] = [
    { value: 'LeftWrist', viewValue: 'Left Wrist' },
    { value: 'RightWrist', viewValue: 'Right Wrist' },
    { value: 'LeftElbow', viewValue: 'Left Elbow' },
    { value: 'RightElbow', viewValue: 'Right Elbow' },
    { value: 'LeftShoulder', viewValue: 'Left Shoulder' },
    { value: 'RightShoulder', viewValue: 'Right Shoulder' },
    { value: 'LeftKnee', viewValue: 'Left Knee' },
    { value: 'RightKnee', viewValue: 'Right Knee' },
    { value: 'LeftAnkle', viewValue: 'Left Ankle' },
    { value: 'RightAnkle', viewValue: 'Right Ankle' },
    { value: 'Back', viewValue: 'Back' }
  ];

  constructor(
    private readonly formsHelper: FormHelperService,
    private readonly route: ActivatedRoute,
    public readonly maskService: MaskService,
    public readonly formatHelper: FormatHelperService) { }

  ngOnInit() {

    this.agentId = parseInt(this.route.snapshot.paramMap.get('agentId'), 10);

    this.initForm();

    // patch values into the form if a Patient is provided
    if (this.patient$) {
      this.patchForm();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  private initForm() {

    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      middleName: new FormControl('', Validators.maxLength(100)),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, CustomValidators.phonenumber]),
      height: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      weight: new FormControl('', [Validators.required, CustomValidators.onlyNumeric, Validators.maxLength(3)]),
      waist: new FormControl('', [Validators.required, CustomValidators.onlyNumeric, Validators.maxLength(3)]),
      shoeSize: new FormControl('', [Validators.required, Validators.maxLength(4)]),
      addressLineOne: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      addressLineTwo: new FormControl('', Validators.maxLength(100)),
      city: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      state: new FormControl('', Validators.required),
      zipCode: new FormControl('', [Validators.required, Validators.maxLength(10), CustomValidators.zip]),
      sex: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
      bestTimeToCallBack: new FormControl('', Validators.required),
      allergies: new FormControl('', [Validators.required, Validators.maxLength(500)]),

      hadBraceBefore: new FormControl('', Validators.required),
      mainPainArea: new FormControl('', Validators.required),
      secondPainArea: new FormControl('', Validators.required),
      painCream: new FormControl('', Validators.required),
      medications: new FormControl('', Validators.maxLength(100)),
      notes: new FormControl('', Validators.maxLength(100)),
      physiciansName: new FormControl('', Validators.maxLength(100)),
      physiciansPhoneNumber: new FormControl('', CustomValidators.phonenumber),
      physicianAddressLineOne: new FormControl('', Validators.maxLength(100)),
      physicianAddressLineTwo: new FormControl('', Validators.maxLength(100)),
      physicianCity: new FormControl('', Validators.maxLength(30)),
      physicianState: new FormControl(''),
      physicianZip: new FormControl('', [Validators.maxLength(10), CustomValidators.zip]),
      therapy: new FormControl('DME', [Validators.required, Validators.maxLength(100)]),
      otherProducts: new FormControl('', Validators.maxLength(100)),
      insurance: new FormControl('', Validators.maxLength(100)),
      insuranceId: new FormControl('', Validators.maxLength(100)),
      privateGroup: new FormControl('', Validators.maxLength(100)),
      privatePcn: new FormControl('', Validators.maxLength(100)),
      bin: new FormControl('', [Validators.maxLength(6), CustomValidators.onlyNumeric]),
      insuranceStreet: new FormControl('', Validators.maxLength(100)),
      insuranceCity: new FormControl('', Validators.maxLength(30)),
      insuranceState: new FormControl(''),
      insuranceZip: new FormControl('', CustomValidators.zip),
      insurancePhone: new FormControl('', CustomValidators.phonenumber),
      memberId: new FormControl('', Validators.maxLength(100)),
      medicareGroup: new FormControl('', Validators.maxLength(100)),
      medicarePcn: new FormControl('', Validators.maxLength(100)),
      subscriberNumber: new FormControl('', Validators.maxLength(100)),
      secondaryInsurance: new FormControl('', Validators.maxLength(100)),
      secondarySubscriberNumber: new FormControl('', Validators.maxLength(100)),
      insuranceType: new FormControl('', Validators.required)
    });
  }

  private patchForm() {

    this.patient$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result: Patient) => {
        this.form.patchValue(result);
        this.form.patchValue(result.address);

        this.form.patchValue({
          state: this.states.find(s => s === result.address.state.toUpperCase())
        });

        this.form.patchValue(
          {
            sex: SexType[result.sex],
            language: LanguageType[result.language],
            therapy: TherapyType[result.therapy],
            insuranceType: InsuranceType[result.insurance],
            bestTimeToCallBack: CallbackTime[result.bestTimeToCallBack]
          });

        if (result.physiciansAddress) {
          this.form.patchValue(
            {
              physicianAddressLineOne: result.physiciansAddress.addressLineOne,
              physicianAddressLineTwo: result.physiciansAddress.addressLineTwo,
              physicianCity: result.physiciansAddress.city,
              physicianState: this.states.find(s => s === result.physiciansAddress.state.toUpperCase()),
              physicianZip: result.physiciansAddress.zipCode,
            });
        }


        if (result.medicare) {
          this.form.patchValue({
            memberId: result.medicare.memberId,
            medicareGroup: result.medicare.patientGroup,
            medicarePcn: result.medicare.pcn,
            subscriberNumber: result.medicare.subscriberNumber,
            secondaryInsurance: result.medicare.secondaryCarrier,
            secondarySubscriberNumber: result.medicare.secondarySubscriberNumber

          });
        }
        if (result.privateInsurance) {
          this.form.patchValue({
            bin: result.privateInsurance.bin,
            insurance: result.privateInsurance.insurance,
            insuranceId: result.privateInsurance.insuranceId,
            privateGroup: result.privateInsurance.group,
            privatePcn: result.privateInsurance.pcn,
            insuranceStreet: result.privateInsurance.street,
            insuranceCity: result.privateInsurance.city,
            insuranceState: this.states.find(s => s === result.privateInsurance.state.toUpperCase()),
            insuranceZip: result.privateInsurance.zip,
            insurancePhone: result.privateInsurance.phone
          });
        }
      });
  }


  onSubmit() {
    if (!this.form.valid) {
      this.formsHelper.markFormGroupTouched(this.form);
      this.formsHelper.setFocusOnError(this.form);
      return;
    }

    const patient = this.buildPatient();

    this.formSubmitEvent.emit(patient);
  }

  radioChange(event: MatRadioChange) {

    // set private fields required
    if (event.source.value === 'PRIVATE') {
      this.form.get('memberId').clearValidators();
      this.form.get('medicareGroup').clearValidators();
      this.form.get('medicarePcn').clearValidators();
      this.form.get('subscriberNumber').clearValidators();
      this.form.get('secondaryInsurance').clearValidators();
      this.form.get('secondarySubscriberNumber').clearValidators();

      this.form.get('bin').validator = Validators.required;
      this.form.get('insurance').validator = Validators.required;
      this.form.get('insuranceId').validator = Validators.required;
      this.form.get('privateGroup').validator = Validators.required;
      this.form.get('privatePcn').validator = Validators.required;
      this.form.get('insuranceStreet').validator = Validators.required;
      this.form.get('insuranceCity').validator = Validators.required;
      this.form.get('insuranceState').validator = Validators.required;
      this.form.get('insuranceZip').validator = Validators.required;
      this.form.get('insurancePhone').validator = Validators.required;
    }

    // set medicare fields required
    if (event.source.value === 'MEDICARE') {
      this.form.get('memberId').validator = Validators.required;
      this.form.get('medicareGroup').validator = Validators.required;
      this.form.get('medicarePcn').validator = Validators.required;
      this.form.get('subscriberNumber').validator = Validators.required;
      this.form.get('secondaryInsurance').validator = Validators.required;
      this.form.get('secondarySubscriberNumber').validator = Validators.required;

      this.form.get('bin').clearValidators();
      this.form.get('insurance').clearValidators();
      this.form.get('insuranceId').clearValidators();
      this.form.get('privateGroup').clearValidators();
      this.form.get('privatePcn').clearValidators();
      this.form.get('insuranceStreet').clearValidators();
      this.form.get('insuranceCity').clearValidators();
      this.form.get('insuranceState').clearValidators();
      this.form.get('insuranceZip').clearValidators();
      this.form.get('insurancePhone').clearValidators();

    }

    this.form.get('memberId').updateValueAndValidity();
    this.form.get('medicareGroup').updateValueAndValidity();
    this.form.get('medicarePcn').updateValueAndValidity();
    this.form.get('subscriberNumber').updateValueAndValidity();
    this.form.get('secondaryInsurance').updateValueAndValidity();
    this.form.get('secondarySubscriberNumber').updateValueAndValidity();
    this.form.get('insurance').updateValueAndValidity();
    this.form.get('insuranceId').updateValueAndValidity();
    this.form.get('privateGroup').updateValueAndValidity();
    this.form.get('privatePcn').updateValueAndValidity();
    this.form.get('insuranceStreet').updateValueAndValidity();
    this.form.get('insuranceCity').updateValueAndValidity();
    this.form.get('insuranceState').updateValueAndValidity();
    this.form.get('insuranceZip').updateValueAndValidity();
    this.form.get('insurancePhone').updateValueAndValidity();

  }


  private buildPatient(): Patient {

    const patient = new Patient();
    patient.agentId = this.agentId;
    patient.firstName = this.form.controls.firstName.value;
    patient.middleName = this.form.controls.middleName.value;
    patient.lastName = this.form.controls.lastName.value;
    patient.dateOfBirth = this.form.controls.dateOfBirth.value;
    patient.phoneNumber = this.formatHelper.toNumbersOnly(this.form.controls.phoneNumber.value);
    patient.allergies = this.form.controls.allergies.value;
    patient.waist = this.form.controls.waist.value;
    patient.weight = this.form.controls.weight.value;
    patient.shoeSize = this.form.controls.shoeSize.value;
    patient.height = this.form.controls.height.value;

    patient.language = this.form.controls.language.value;
    patient.bestTimeToCallBack = this.form.controls.bestTimeToCallBack.value;

    patient.medications = this.form.controls.medications.value;
    patient.notes = this.form.controls.notes.value;
    patient.otherProducts = this.form.controls.otherProducts.value;
    patient.physiciansName = this.form.controls.physiciansName.value;
    patient.physiciansPhoneNumber = this.formatHelper.toNumbersOnly(this.form.controls.physiciansPhoneNumber.value);

    patient.therapy = this.form.controls.therapy.value;
    patient.insurance = this.form.controls.insuranceType.value;
    patient.isDme = true;

    patient.mainPainArea = this.form.controls.mainPainArea.value;
    patient.secondPainArea = this.form.controls.secondPainArea.value;
    patient.hadBraceBefore = this.form.controls.hadBraceBefore.value;
    patient.painCream = this.form.controls.painCream.value;

    patient.address = new Address();
    patient.address.addressLineOne = this.form.controls.addressLineOne.value;
    patient.address.addressLineTwo = this.form.controls.addressLineTwo.value;
    patient.address.city = this.form.controls.city.value;
    patient.address.state = this.form.controls.state.value;
    patient.address.zipCode = this.form.controls.zipCode.value;

    patient.physiciansAddress = new Address();
    patient.physiciansAddress.addressLineOne = this.form.controls.physicianAddressLineOne.value;
    patient.physiciansAddress.addressLineTwo = this.form.controls.physicianAddressLineTwo.value;
    patient.physiciansAddress.city = this.form.controls.physicianCity.value;
    patient.physiciansAddress.state = this.form.controls.physicianState.value;
    patient.physiciansAddress.zipCode = this.form.controls.physicianZip.value;

    if (this.form.controls.insuranceType.value === 'PRIVATE') {
      patient.privateInsurance = new PrivateInsurance();
      patient.privateInsurance.bin = this.form.controls.bin.value;
      patient.privateInsurance.insurance = this.form.controls.insurance.value;
      patient.privateInsurance.insuranceId = this.form.controls.insuranceId.value;
      patient.privateInsurance.group = this.form.controls.privateGroup.value;
      patient.privateInsurance.pcn = this.form.controls.privatePcn.value;
      patient.privateInsurance.street = this.form.controls.insuranceStreet.value;
      patient.privateInsurance.city = this.form.controls.insuranceCity.value;
      patient.privateInsurance.state = this.form.controls.insuranceState.value;
      patient.privateInsurance.zip = this.form.controls.insuranceZip.value;
      patient.privateInsurance.phone = this.formatHelper.toNumbersOnly(this.form.controls.insurancePhone.value);
    }

    if (this.form.controls.insuranceType.value === 'MEDICARE') {
      patient.medicare = new Medicare();
      patient.medicare.memberId = this.form.controls.memberId.value;
      patient.medicare.patientGroup = this.form.controls.medicareGroup.value;
      patient.medicare.pcn = this.form.controls.medicarePcn.value;
      patient.medicare.subscriberNumber = this.form.controls.subscriberNumber.value;
      patient.medicare.secondaryCarrier = this.form.controls.secondaryInsurance.value;
      patient.medicare.secondarySubscriberNumber = this.form.controls.secondarySubscriberNumber.value;
    }

    if (patient.physiciansAddress.addressLineOne.length === 0
      || patient.physiciansAddress.zipCode.length === 0
      || patient.physiciansAddress.city.length === 0
      || patient.physiciansAddress.state.length === 0) {
      patient.physiciansAddress = null;
    }

    return patient;
  }


}
