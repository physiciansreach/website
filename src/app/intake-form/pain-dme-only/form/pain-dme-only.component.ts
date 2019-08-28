import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';

import { Answer } from 'src/app/models/answer.model';
import { IntakeFormType } from 'src/app/models/enums/intake-form-type.enum';
import { IntakeStatus } from 'src/app/models/enums/intake-status.enum';
import { IntakeForm } from 'src/app/models/intake-form.model';
import { Question } from 'src/app/models/question.model';
import { LookupService } from 'src/app/services/lookupservice';
import { MaskService } from 'src/app/services/mask.service';


export class PainQuestion {
  key: string;
  painPoint: string;
  text: string;
}

@Component({
  selector: 'app-pain-dme-only',
  templateUrl: './pain-dme-only.component.html',
  styleUrls: ['./pain-dme-only.component.scss']
})
export class PainDmeOnlyComponent implements OnInit, OnDestroy {

  @Output() formSubmitEvent = new EventEmitter<IntakeForm[]>();

  public form: FormGroup;
  public painPoints = LookupService.painPoints;

  public patientId: number;

  private unsubscribe$ = new Subject();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    public readonly maskService: MaskService) { }

  ngOnInit() {
    this.patientId = parseInt(this.route.snapshot.paramMap.get('patientId'), 10);
    this.initForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  onCheck(event: MatCheckboxChange) {

    // https://alligator.io/angular/reactive-forms-formarray-dynamic-fields/

    const checked = event.checked;
    const painPoint = event.source.value;

    if (checked) {
      this.addQuestions(painPoint);
    } else {
      this.removeQuestions(painPoint);
    }

  }

  onSubmit() {

    if (!this.form.valid) {
      return;
    }

    const intakeForms = this.buildIntakeForms();

    this.formSubmitEvent.emit(intakeForms);

  }

  formArrayControls(key: string): AbstractControl[] {
    return (<FormArray>this.form.get(key)).controls;
  }

  private initForm() {

    this.form = this.formBuilder.group({
      leftWrist: new FormControl(''),
      leftWristQuestions: this.formBuilder.array([]),
      rightWrist: new FormControl(''),
      rightWristQuestions: this.formBuilder.array([]),
      leftElbow: new FormControl(''),
      leftElbowQuestions: this.formBuilder.array([]),
      rightElbow: new FormControl(''),
      rightElbowQuestions: this.formBuilder.array([]),
      leftAnteriorShoulder: new FormControl(''),
      leftAnteriorShoulderQuestions: this.formBuilder.array([]),
      rightAnteriorShoulder: new FormControl(''),
      rightAnteriorShoulderQuestions: this.formBuilder.array([]),
      leftPosteriorShoulder: new FormControl(''),
      leftPosteriorShoulderQuestions: this.formBuilder.array([]),
      rightPosteriorShoulder: new FormControl(''),
      rightPosteriorShoulderQuestions: this.formBuilder.array([]),
      leftKnee: new FormControl(''),
      leftKneeQuestions: this.formBuilder.array([]),
      rightKnee: new FormControl(''),
      rightKneeQuestions: this.formBuilder.array([]),
      leftAnkle: new FormControl(''),
      leftAnkleQuestions: this.formBuilder.array([]),
      rightAnkle: new FormControl(''),
      rightAnkleQuestions: this.formBuilder.array([]),
      rightHip: new FormControl(''),
      rightHipQuestions: this.formBuilder.array([]),
      leftHip: new FormControl(''),
      leftHipQuestions: this.formBuilder.array([]),
    });
  }

  private buildIntakeForms() {

    const intakeForms: IntakeForm[] = [];

    this.addIntake(intakeForms, 'leftWrist');
    this.addIntake(intakeForms, 'rightWrist');
    this.addIntake(intakeForms, 'leftElbow');
    this.addIntake(intakeForms, 'rightElbow');
    this.addIntake(intakeForms, 'leftAnteriorShoulder');
    this.addIntake(intakeForms, 'rightAnteriorShoulder');
    this.addIntake(intakeForms, 'leftPosteriorShoulder');
    this.addIntake(intakeForms, 'rightPosteriorShoulder');
    this.addIntake(intakeForms, 'leftKnee');
    this.addIntake(intakeForms, 'rightKnee');
    this.addIntake(intakeForms, 'leftAnkle');
    this.addIntake(intakeForms, 'rightAnkle');
    this.addIntake(intakeForms, 'back');

    return intakeForms;
  }

  private addIntake(intakeForms: IntakeForm[], key: string) {

    if (this.form.get(key).value === true) {
      intakeForms.push(this.buildIntake(key));
    }
  }

  private buildIntake(painPoint: string): IntakeForm {

    const formArray = this.form.get(painPoint + 'Questions') as FormArray;
    if (!formArray) {
      return;
    }

    const formGroup = formArray.controls[0] as FormGroup;
    if (!formGroup) {
      return;
    }

    const intake = new IntakeForm();
    intake.status = IntakeStatus.New;
    intake.patientId = this.patientId;
    intake.intakeFormType = IntakeFormType.PainDmeOnly;
    intake.questions = [];

    const question = new Question();
    question.key = 'painArea';
    question.text = 'painArea';
    question.answers = [{ answerId: undefined, text: painPoint }];

    intake.questions.push(question);
    intake.questions.push(this.buildQuestion(formGroup, 'painFeeling', 'Cause of Patients Pain?'));
    intake.questions.push(this.buildQuestion(formGroup, 'painBegan', 'Onset of pain (When did the pain begin?)'));
    intake.questions.push(this.buildQuestion(formGroup, 'painCause', 'What Provokes Pain?'));
    intake.questions.push(this.buildQuestion(formGroup, 'painSelfTreatment', 'What currently relieves the pain?'));
    intake.questions.push(this.buildQuestion(formGroup, 'painDescription', 'Description of Pain [Sharp/Stabbing, Weak Feeling/Unstable]'));
    intake.questions.push(this.buildQuestion(formGroup, 'painDuration', 'Duration of Pain (Constant (Daily), Intermittent (from time to time), Specifically when (activity that makes it worse))'));
    intake.questions.push(this.buildQuestion(formGroup, 'previousTreatment', 'Other or Previous Helpful Treatments(Brace, Physical Therapy, Meds)'));
    intake.questions.push(this.buildQuestion(formGroup, 'effectsDaily', 'Affects Activities of Daily Living(ADL) (If so, what?)'));
    intake.questions.push(this.buildQuestion(formGroup, 'hadSurgery', 'Have you had surgery in this area?'));
    intake.questions.push(this.buildQuestion(formGroup, 'surgies', 'If yes, what type of surgery?'));
    intake.questions.push(this.buildQuestion(formGroup, 'dateOfSurgery', 'Date of Surgery'));
    intake.questions.push(this.buildQuestion(formGroup, 'abulatory', 'Are you abulatory? (can you walk on your own, or with a walker, or with a crutch)'));
    intake.questions.push(this.buildQuestion(formGroup, 'painLevel', 'Pain Rating'));

    return intake;
  }

  private buildQuestion(formGroup: FormGroup, key: string, text: string): Question {

    const question = new Question();
    question.key = key;
    question.text = key;
    question.answers = [];

    const answer = new Answer();
    answer.text = formGroup.get(key).value ? formGroup.get(key).value : '';
    question.answers.push(answer);

    return question;
  }

  private addQuestions(painPoint: string) {

    const questions = this.form.get(painPoint + 'Questions') as FormArray;
    const group = this.formBuilder.group({
      painFeeling: '', painBegan: '', painCause: '', painSelfTreatment: '',
      painDescription: '', painDuration: '', previousTreatment: '', effectsDaily: '',
      hadSurgery: '', surgies: '', dateOfSurgery: '', abulatory: '', painLevel: '',
    });

    questions.push(group);
  }

  private removeQuestions(painPoint: string) {
    const questions = this.form.get(painPoint + 'Questions') as FormArray;
    for (let i = 0; i < questions.length; i++) {
      questions.removeAt(i);
    }
  }


}
