import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouteUrls } from 'src/app/constants/routes';
import { AccountType } from 'src/app/models/enums/account-type.enum';
import { IntakeForm } from 'src/app/models/intake-form.model';
import { UserAccount } from 'src/app/models/user-account.model';
import { IntakeFormService } from 'src/app/services/api/intake-form.service';
import { MaskService } from 'src/app/services/mask.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-edit-pain-dme-only',
  templateUrl: './edit-pain-dme-only.component.html',
  styleUrls: ['./edit-pain-dme-only.component.scss']
})
export class EditPainDmeOnlyComponent implements OnInit, OnDestroy {

  private intakeId: number;
  private intake: IntakeForm;
  private isAdmin: boolean;
  private unsubscribe$ = new Subject();

  public form: FormGroup;
  public painArea: string;

  constructor(
    private readonly session: SessionService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly intakeApi: IntakeFormService,
    public readonly maskService: MaskService
  ) { }

  ngOnInit() {
    this.intakeId = parseInt(this.route.snapshot.paramMap.get('intakeFormId'), 10);

    this.session.userAccount$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((account: UserAccount) => {
        this.isAdmin = account.type === AccountType.Admin;
      });

    this.form = new FormGroup({
      painFeeling: new FormControl(''),
      painBegan: new FormControl(''),
      painCause: new FormControl(''),
      painSelfTreatment: new FormControl(''),
      painDescription: new FormControl(''),
      painDuration: new FormControl(''),
      previousTreatment: new FormControl(''),
      effectsDaily: new FormControl(''),
      hadSurgery: new FormControl(''),
      surgies: new FormControl(''),
      dateOfSurgery: new FormControl(''),
      abulatory: new FormControl(''),
      painLevel: new FormControl('')
    });

    this.intakeApi
      .get(this.intakeId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result: IntakeForm) => {

        this.intake = result;
        this.painArea = this.getAnswer('painArea');

        this.form.patchValue({
          painFeeling: this.getAnswer('painFeeling'),
          painBegan: this.getAnswer('painBegan'),
          painCause: this.getAnswer('painCause'),
          painSelfTreatment: this.getAnswer('painSelfTreatment'),
          painDescription: this.getAnswer('painDescription'),
          painDuration: this.getAnswer('painDuration'),
          previousTreatment: this.getAnswer('previousTreatment'),
          effectsDaily: this.getAnswer('effectsDaily'),
          hadSurgery: this.getAnswer('hadSurgery'),
          surgies: this.getAnswer('surgies'),
          dateOfSurgery: this.getAnswer('dateOfSurgery'),
          abulatory: this.getAnswer('abulatory'),
          painLevel: this.getAnswer('painLevel')
        });

      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  getAnswer(key: string) {
    const question = this.intake.questions.filter(q => q.key === key);
    return question[0].answers[0].text;
  }

  onSubmit() {

    if (!this.form.valid) {
      return;
    }

    this.fillIntake();

    this.intakeApi
      .put(this.intake.intakeFormId, this.intake)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (this.isAdmin) {
          this.router.navigateByUrl('admin');
        } else {
          this.router.navigateByUrl(RouteUrls.AgentDashboardComponent);
        }
      });
  }

  fillIntake() {

    this.populateQuestionAnswer('painFeeling', 'Cause of Patients Pain?');
    this.populateQuestionAnswer('painBegan', 'Onset of pain (When did the pain begin?)');
    this.populateQuestionAnswer('painCause', 'What Provokes Pain?');
    this.populateQuestionAnswer('painSelfTreatment', 'What currently relieves the pain?');
    this.populateQuestionAnswer('painDescription', 'Description of Pain [Sharp/Stabbing, Weak Feeling/Unstable]');
    this.populateQuestionAnswer('painDuration', 'Duration of Pain (Constant (Daily), Intermittent (from time to time), Specifically when (activity that makes it worse))');
    this.populateQuestionAnswer('previousTreatment', 'Other or Previous Helpful Treatments(Brace, Physical Therapy, Meds)');
    this.populateQuestionAnswer('effectsDaily', 'Affects Activities of Daily Living(ADL) (If so, what?)');
    this.populateQuestionAnswer('hadSurgery', 'Have you had surgery in this area?');
    this.populateQuestionAnswer('surgies', 'If yes, what type of surgery?');
    this.populateQuestionAnswer('dateOfSurgery', 'Date of Surgery');
    this.populateQuestionAnswer('abulatory', 'Are you abulatory? (can you walk on your own, or with a walker, or with a crutch)');
    this.populateQuestionAnswer('painLevel', 'Pain Rating');
  }

  private populateQuestionAnswer(key: string, text: string) {

    const question = this.intake.questions.filter(q => q.key === key);
    const answer = question[0].answers[0];

    answer.text = this.form.get(key).value ? this.form.get(key).value : '';
  }


}
