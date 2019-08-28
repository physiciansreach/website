import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Answer } from 'src/app/models/answer.model';
import { IntakeFormType } from 'src/app/models/enums/intake-form-type.enum';
import { IntakeForm } from 'src/app/models/intake-form.model';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-footbath-rx-only',
  templateUrl: './footbath-rx-only.component.html',
  styleUrls: ['./footbath-rx-only.component.scss']
})
export class FootbathRxOnlyComponent implements OnInit {

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
    this.questions.push(this.initQuestion('1', 'Are you experiencing itching, stinging and or burning between your toes or on the soles of your feet?'));
    this.questions.push(this.initQuestion('2', 'Do you have blisters on your feet that itch?'));
    this.questions.push(this.initQuestion('3', 'Do you have cracking and peeling skin on your feet, especially between your toes and on your soles?'));
    this.questions.push(this.initQuestion('4', 'Do you have dry skin on your soles?'));
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
    intake.intakeFormType = IntakeFormType.FootbathRxOnly;
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
