import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Answer } from 'src/app/models/answer.model';
import { IntakeFormType } from 'src/app/models/enums/intake-form-type.enum';
import { IntakeForm } from 'src/app/models/intake-form.model';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-scar-rx-only',
  templateUrl: './scar-rx-only.component.html',
  styleUrls: ['./scar-rx-only.component.scss']
})
export class ScarRxOnlyComponent implements OnInit {

  @Output() formSubmitEvent = new EventEmitter<IntakeForm>();

  form: FormGroup;
  patientId: number;
  questions: Question[] = [];
  q3DisplayOther = false;

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.patientId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.initQuestions();
    this.initForm();
  }

  initQuestions() {
    this.questions.push(this.initQuestion('1', 'Where is your scar located?'));
    this.questions.push(this.initQuestion('2', 'How long have you had this scar?'));
    this.questions.push(this.initQuestion('3', 'What is the cause of your scar?'));
    this.questions.push(this.initQuestion('4', 'Have you treated the scar before?'));
  }

  initForm() {
    this.form = new FormGroup({
      q1: new FormControl('', Validators.required),
      q2: new FormControl('', Validators.required),
      q3: new FormControl('', Validators.required),
      q3_other: new FormControl(''),
      q4_1: new FormControl(''),
      q4_2: new FormControl(''),
      q4_3: new FormControl(''),
      q4_4: new FormControl(''),
      q4_other: new FormControl('')
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

    if (this.form.controls['q3'].value === 'other') {
      this.addAnswer(this.questions[2], this.form.controls['q3_other'].value);
    } else {
      this.addAnswer(this.questions[2], this.form.controls['q3'].value);
    }

    // Question 4
    if (this.form.controls['q4_1'].value === true) {
      this.addAnswer(this.questions[3], 'No');
    }
    if (this.form.controls['q4_2'].value === true) {
      this.addAnswer(this.questions[3], 'Cream');
    }
    if (this.form.controls['q4_3'].value === true) {
      this.addAnswer(this.questions[3], 'Plastic Surgery');
    }
    if (this.form.controls['q4_4'].value === true) {
      this.addAnswer(this.questions[3], 'OTC Products');
    }
    if (this.form.controls['q4_other'].value) {
      this.addAnswer(this.questions[3], this.form.controls['q4_other'].value);
    }


    const intake = new IntakeForm();
    intake.intakeFormType = IntakeFormType.ScarRxOnly;
    intake.questions = this.questions;
    intake.patientId = this.patientId;

    return intake;
  }

  q3_change($event: MatRadioChange) {
    if ($event.source.name === 'other') {
      this.q3DisplayOther = !this.q3DisplayOther;
    }
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
