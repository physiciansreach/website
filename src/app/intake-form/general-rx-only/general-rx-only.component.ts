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
  selector: 'app-general-rx-only',
  templateUrl: './general-rx-only.component.html',
  styleUrls: ['./general-rx-only.component.scss']
})
export class GeneralRxOnlyComponent implements OnInit {

  @Output() formSubmitEvent = new EventEmitter<IntakeForm>();

  form: FormGroup;
  patientId: number;
  questions: Question[] = [];
  heights: string[] = LookupService.heights;

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.patientId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.initQuestions();
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      q1: new FormControl('', Validators.required),
      q2: new FormControl('', [Validators.required, CustomValidators.onlyNumeric]),
      q3: new FormControl('', Validators.required),
      q4: new FormControl('', Validators.required),
      q5: new FormControl('', Validators.required),
      q6: new FormControl('', Validators.required),
      q7: new FormControl('', Validators.required),
      q8: new FormControl('', Validators.required),
      q9: new FormControl('', Validators.required),
      q10: new FormControl('', Validators.required),
      q11: new FormControl('', Validators.required),
      q12: new FormControl('', Validators.required),
      q13: new FormControl('', Validators.required),
      q14: new FormControl('', Validators.required),
      q15: new FormControl('', Validators.required),
      q16: new FormControl('', Validators.required),
      q17: new FormControl('', Validators.required)
    });
  }

  initQuestions() {

    this.questions.push(this.initQuestion('Height', 'How tall are you?'));
    this.questions.push(this.initQuestion('Weight', 'How much do you weigh?'));
    this.questions.push(this.initQuestion('painArea', 'Location of pain?'));
    this.questions.push(this.initQuestion('4', 'What current medications are you taking?'));
    this.questions.push(this.initQuestion('Allergies', 'Do you have any allergies?'));
    this.questions.push(this.initQuestion('6', 'Recent medical issues related to heart, liver, or kidneys?'));
    this.questions.push(this.initQuestion('7', 'Do you get migraine or sinus headaches?'));
    this.questions.push(this.initQuestion('8', 'Do you have any rashes or scars on your body?'));
    this.questions.push(this.initQuestion('9', 'Do you have chronic heartburn or acid reflux?'));
    this.questions.push(this.initQuestion('10', 'Do you experience dry mouth?'));
    this.questions.push(this.initQuestion('11', 'Are you diabetic?'));
    this.questions.push(this.initQuestion('12', 'Do you take oral or insulin to treat diabetes?'));
    this.questions.push(this.initQuestion('13', 'Have you seen a doctor in the last 12 months?'));
    this.questions.push(this.initQuestion('14', 'Have you had a liver test or liver function test?'));
    this.questions.push(this.initQuestion('15', 'Do you have a history of coronary heart disease?'));
    this.questions.push(this.initQuestion('16', `Have you in the past or currently have a fungal infection such as athlete's foot or general fungus between your toes?`));
    this.questions.push(this.initQuestion('17', 'Do you suffer from any of the following fungal infections of the skin?'));
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
    this.addAnswer(this.questions[4], this.form.controls['q5'].value);
    this.addAnswer(this.questions[5], this.form.controls['q6'].value);
    this.addAnswer(this.questions[6], this.form.controls['q7'].value);
    this.addAnswer(this.questions[7], this.form.controls['q8'].value);
    this.addAnswer(this.questions[8], this.form.controls['q9'].value);
    this.addAnswer(this.questions[9], this.form.controls['q10'].value);
    this.addAnswer(this.questions[10], this.form.controls['q11'].value);
    this.addAnswer(this.questions[11], this.form.controls['q12'].value);
    this.addAnswer(this.questions[12], this.form.controls['q13'].value);
    this.addAnswer(this.questions[13], this.form.controls['q14'].value);
    this.addAnswer(this.questions[14], this.form.controls['q15'].value);
    this.addAnswer(this.questions[15], this.form.controls['q16'].value);
    this.addAnswer(this.questions[16], this.form.controls['q17'].value);

    const intake = new IntakeForm();
    intake.intakeFormType = IntakeFormType.GeneralRxOnly;
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
