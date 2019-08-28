import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Answer } from 'src/app/models/answer.model';
import { IntakeFormType } from 'src/app/models/enums/intake-form-type.enum';
import { IntakeForm } from 'src/app/models/intake-form.model';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-heartburn-acid-rx-only',
  templateUrl: './heartburn-acid-rx-only.component.html',
  styleUrls: ['./heartburn-acid-rx-only.component.scss']
})
export class HeartburnAcidRxOnlyComponent implements OnInit {

  @Output() formSubmitEvent = new EventEmitter<IntakeForm>();

  form: FormGroup;
  patientId: number;
  questions: Question[] = [];

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.patientId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.initQuestions();
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      q1: new FormControl('', Validators.required),
      q1_other: new FormControl(''),
      q2_1: new FormControl(''),
      q2_2: new FormControl(''),
      q2_3: new FormControl(''),
      q2_4: new FormControl(''),
      q2_other: new FormControl('')
    });
  }

  initQuestions() {
    this.questions.push(this.initQuestion('1', 'How often do you experience heartburn/acid re-flux?'));
    this.questions.push(this.initQuestion('2', 'What do you do for relief?'));
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

    this.addAnswer(this.questions[0], this.form.controls['q1'].value);
    this.addAnswer(this.questions[0], this.form.controls['q1_other'].value);

    // Question 4
    if (this.form.controls['q2_1'].value === true) {
      this.addAnswer(this.questions[1], 'Diet Changes');
    }
    if (this.form.controls['q2_2'].value === true) {
      this.addAnswer(this.questions[1], 'OTC Meds');
    }
    if (this.form.controls['q2_3'].value === true) {
      this.addAnswer(this.questions[1], 'Prescribed Meds');
    }
    if (this.form.controls['q2_4'].value === true) {
      this.addAnswer(this.questions[1], 'Rest');
    }
    if (this.form.controls['q2_other'].value) {
      this.addAnswer(this.questions[1], this.form.controls['q2_other'].value);
    }

    const intake = new IntakeForm();
    intake.intakeFormType = IntakeFormType.HeartburnAcidRxOnly;
    intake.questions = this.questions;
    intake.patientId = this.patientId;

    return intake;
  }

  addAnswer(question: Question, value: string) {
    const answer = new Answer();
    answer.text = value;
    question.answers.push(answer);
  }

}
