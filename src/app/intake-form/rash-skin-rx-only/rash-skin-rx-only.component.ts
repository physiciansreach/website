import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Answer } from 'src/app/models/answer.model';
import { IntakeFormType } from 'src/app/models/enums/intake-form-type.enum';
import { IntakeForm } from 'src/app/models/intake-form.model';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-rash-skin-rx-only',
  templateUrl: './rash-skin-rx-only.component.html',
  styleUrls: ['./rash-skin-rx-only.component.scss']
})
export class RashSkinRxOnlyComponent implements OnInit {

  @Output() formSubmitEvent = new EventEmitter<IntakeForm>();

  form: FormGroup;
  questions: Question[] = [];
  patientId: number;

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.patientId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.initQuestions();
    this.initForm();
  }

  initQuestions() {
    this.questions.push(this.initQuestion('1', 'Where is your rash/skin irritation located?'));
    this.questions.push(this.initQuestion('2', 'How long have you had it?'));
    this.questions.push(this.initQuestion('3', 'What is the cause of your skin irritation?'));
    this.questions.push(this.initQuestion('4', 'Have you treated the skin irritation before?'));
  }

  initForm() {
    this.form = new FormGroup({
      q1: new FormControl('', Validators.required),
      q2: new FormControl('', Validators.required),
      q3: new FormControl('', Validators.required),
      q4: new FormControl('', Validators.required)
    });
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
    this.addAnswer(this.questions[1], this.form.controls['q2'].value);
    this.addAnswer(this.questions[2], this.form.controls['q3'].value);
    this.addAnswer(this.questions[3], this.form.controls['q4'].value);

    const intake = new IntakeForm();
    intake.intakeFormType = IntakeFormType.RashSkinRxOnly;
    intake.questions = this.questions;
    intake.patientId = this.patientId;

    return intake;
  }

  initQuestion(key: string, text: string): Question {
    const question = new Question();
    question.key = key;
    question.text = text;
    question.answers = [];

    return question;
  }

  addAnswer(question: Question, value: string) {
    const answer = new Answer();
    answer.text = value;
    question.answers.push(answer);
  }

}
