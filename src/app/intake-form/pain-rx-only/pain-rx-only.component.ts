import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Answer } from 'src/app/models/answer.model';
import { IntakeFormType } from 'src/app/models/enums/intake-form-type.enum';
import { IntakeForm } from 'src/app/models/intake-form.model';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-pain-rx-only',
  templateUrl: './pain-rx-only.component.html',
  styleUrls: ['./pain-rx-only.component.scss']
})
export class PainRxOnlyComponent implements OnInit {

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
      q2: new FormControl('', Validators.required),
      q3: new FormControl('', Validators.required),
      q4: new FormControl('', Validators.required),
      q5_1: new FormControl(''),
      q5_2: new FormControl(''),
      q5_3: new FormControl(''),
      q5_4: new FormControl(''),
      q5_5: new FormControl(''),
      q5_6: new FormControl(''),
      q5_7: new FormControl(''),
      q6_1: new FormControl(''),
      q6_2: new FormControl(''),
      q6_3: new FormControl(''),
      q6_4: new FormControl(''),
      q6_5: new FormControl(''),
      q6_6: new FormControl(''),
      q6_7: new FormControl(''),
      q7_1: new FormControl(''),
      q7_2: new FormControl(''),
      q7_3: new FormControl(''),
      q7_4: new FormControl(''),
      q7_5: new FormControl(''),
      q7_6: new FormControl(''),
      q8: new FormControl('', Validators.required),
      q9: new FormControl('', Validators.required),
      q10: new FormControl('', Validators.required),
      q11: new FormControl('', Validators.required),
      q12: new FormControl('', Validators.required)
    });
  }

  initQuestions() {
    this.questions.push(this.initQuestion('painArea', 'Location(s) of pain?'));
    this.questions.push(this.initQuestion('PainBegan', 'When was the onset of pain?'));
    this.questions.push(this.initQuestion('PainCause', 'What was the cause of pain?'));
    this.questions.push(this.initQuestion('PainDuration', 'What is the duration of pain?'));
    this.questions.push(this.initQuestion('PainDescription', 'Can you describe the pain?'));
    this.questions.push(this.initQuestion('6', 'What makes your pain feel better?'));
    this.questions.push(this.initQuestion('7', 'What makes your pain feel worst?'));
    this.questions.push(this.initQuestion('PainLevel', 'Rate your pain 0 (none) - 10 (excruciating)?'));
    this.questions.push(this.initQuestion('9', 'Have you recently experienced pain due to muscle spasms, body tesnion or tight muscles that you would like treated?'));
    this.questions.push(this.initQuestion('10', 'Have you recently experienced discomfort due to muscle pain or tightness you would like treated?'));
    this.questions.push(this.initQuestion('11', 'Do you have arthritis, joint pain, or any other pain do to inflammation that you wouldl like treated?'));
    this.questions.push(this.initQuestion('12', 'Have you recently experienced discomfort due to swelling or soreness that you would like treated?'));
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
    this.addAnswer(this.questions[1], this.form.controls['q2'].value);
    this.addAnswer(this.questions[2], this.form.controls['q3'].value);
    this.addAnswer(this.questions[3], this.form.controls['q4'].value);

    // Question 5
    if (this.form.controls['q5_1'].value === true) {
      this.addAnswer(this.questions[4], 'Sharp/Stabbing');
    }
    if (this.form.controls['q5_2'].value === true) {
      this.addAnswer(this.questions[4], 'Dull Ache');
    }
    if (this.form.controls['q5_3'].value === true) {
      this.addAnswer(this.questions[4], 'Throbbing/Pulsating');
    }
    if (this.form.controls['q5_4'].value === true) {
      this.addAnswer(this.questions[4], 'Stiffness/Tightness');
    }
    if (this.form.controls['q5_5'].value === true) {
      this.addAnswer(this.questions[4], 'Weak feeling/Unstable');
    }
    if (this.form.controls['q5_6'].value === true) {
      this.addAnswer(this.questions[4], 'Radiating/Traveling');
    }
    if (this.form.controls['q5_7'].value === true) {
      this.addAnswer(this.questions[4], 'Pins & Needles');
    }

    // Question 6
    if (this.form.controls['q6_1'].value === true) {
      this.addAnswer(this.questions[5], 'Heat');
    }
    if (this.form.controls['q6_2'].value === true) {
      this.addAnswer(this.questions[5], 'Ice');
    }
    if (this.form.controls['q6_3'].value === true) {
      this.addAnswer(this.questions[5], 'Lying Down');
    }
    if (this.form.controls['q6_4'].value === true) {
      this.addAnswer(this.questions[5], 'Rest');
    }
    if (this.form.controls['q6_5'].value === true) {
      this.addAnswer(this.questions[5], 'Hot shower');
    }
    if (this.form.controls['q6_6'].value === true) {
      this.addAnswer(this.questions[5], 'Medication');
    }
    if (this.form.controls['q6_7'].value === true) {
      this.addAnswer(this.questions[5], 'Nothing Specific');
    }

    // Question 7
    if (this.form.controls['q7_1'].value === true) {
      this.addAnswer(this.questions[6], 'Standing/Sitting');
    }
    if (this.form.controls['q7_2'].value === true) {
      this.addAnswer(this.questions[6], 'Bending/Stooping');
    }
    if (this.form.controls['q7_3'].value === true) {
      this.addAnswer(this.questions[6], 'Twisting');
    }
    if (this.form.controls['q7_4'].value === true) {
      this.addAnswer(this.questions[6], 'Walking');
    }
    if (this.form.controls['q7_5'].value === true) {
      this.addAnswer(this.questions[6], 'Driving');
    }
    if (this.form.controls['q7_6'].value === true) {
      this.addAnswer(this.questions[6], 'Lifting');
    }

    this.addAnswer(this.questions[7], this.form.controls['q8'].value);
    this.addAnswer(this.questions[8], this.form.controls['q9'].value);
    this.addAnswer(this.questions[9], this.form.controls['q10'].value);
    this.addAnswer(this.questions[10], this.form.controls['q11'].value);
    this.addAnswer(this.questions[11], this.form.controls['q12'].value);

    const intake = new IntakeForm();
    intake.intakeFormType = IntakeFormType.PainRxOnly;
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
