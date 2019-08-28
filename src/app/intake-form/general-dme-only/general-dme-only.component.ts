import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Answer } from 'src/app/models/answer.model';
import { IntakeFormType } from 'src/app/models/enums/intake-form-type.enum';
import { IntakeForm } from 'src/app/models/intake-form.model';
import { Question } from 'src/app/models/question.model';
import { LookupService } from 'src/app/services/lookupservice';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-general-dme-only',
  templateUrl: './general-dme-only.component.html',
  styleUrls: ['./general-dme-only.component.scss']
})
export class GeneralDmeOnlyComponent implements OnInit {

  @Output() formSubmitEvent = new EventEmitter<IntakeForm>();

  form: FormGroup;
  patientId: number;
  questions: Question[] = [];
  shoeSizes: string[] = LookupService.shoeSizes;
  heights: string[] = LookupService.heights;

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.patientId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.initQuestions();
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      height: new FormControl('', Validators.required),
      weight: new FormControl('', [Validators.required, CustomValidators.onlyNumeric]),
      shoesize: new FormControl('', Validators.required),
      waistSize: new FormControl('', [Validators.required, CustomValidators.onlyNumeric]),
      medications: new FormControl('', Validators.required),
      allergies: new FormControl('', Validators.required),
      hasSeenPrimaryCareDr: new FormControl('', Validators.required),
      hasPrescBrace: new FormControl('', Validators.required),
      diabetic: new FormControl('', Validators.required),
      insulinOrMedication: new FormControl('', Validators.required)
    });
  }

  initQuestions() {
    this.questions.push(this.initQuestion('Height', 'How tall are you?'));
    this.questions.push(this.initQuestion('Weight', 'How much do you weigh?'));
    this.questions.push(this.initQuestion('ShoeSize', 'What is your shoe size?'));
    this.questions.push(this.initQuestion('Waist', 'What is your waist size?'));
    this.questions.push(this.initQuestion('5', 'What current medications are you taking?'));
    this.questions.push(this.initQuestion('Allergies', 'Do you have any allergies?'));
    this.questions.push(this.initQuestion('7', 'Have you seen your primary care physician within the last year?'));
    this.questions.push(this.initQuestion('8', 'Have you been prescribed any type of brace within the last 5 years?'));
    this.questions.push(this.initQuestion('9', 'Are you diabetic?'));
    this.questions.push(this.initQuestion('10', 'Do you take insulin or oral medication for diabetes?'));
  }

  initQuestion(key: string, text: string): Question {
    const question = new Question();
    question.key = key;
    question.text = text;
    question.answers = [];

    return question;
  }

  onSubmit() {

    if (!this.form.valid) {
      return;
    }

    const intakeForm = this.buildIntake();

    this.formSubmitEvent.emit(intakeForm);
  }

  buildIntake(): IntakeForm {

    this.addAnswer(this.questions[0], this.getControlValue('height'));
    this.addAnswer(this.questions[1], this.getControlValue('weight'));
    this.addAnswer(this.questions[2], this.getControlValue('shoesize'));
    this.addAnswer(this.questions[3], this.getControlValue('waistSize') + ' inches');
    this.addAnswer(this.questions[4], this.getControlValue('medications'));
    this.addAnswer(this.questions[5], this.getControlValue('allergies'));
    this.addAnswer(this.questions[6], this.getControlValue('hasSeenPrimaryCareDr'));
    this.addAnswer(this.questions[7], this.getControlValue('hasPrescBrace'));
    this.addAnswer(this.questions[8], this.getControlValue('diabetic'));
    this.addAnswer(this.questions[9], this.getControlValue('insulinOrMedication'));

    const intake = new IntakeForm();
    intake.intakeFormType = IntakeFormType.GeneralDmeOnly;
    intake.questions = this.questions;
    intake.patientId = this.patientId;

    return intake;
  }

  getControlValue(key: string) {
    const val = this.form.controls[key].value;

    if (val) {
      return val;
    }

    return '';
  }

  addAnswer(question: Question, value: string) {
    const answer = new Answer();
    answer.text = value;
    question.answers.push(answer);
  }
}
