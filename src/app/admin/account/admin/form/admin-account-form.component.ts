import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Admin } from 'src/app/models/admin.model';
import { AccountType } from 'src/app/models/enums/account-type.enum';
import { UserAccount } from 'src/app/models/user-account.model';
import { CustomValidators } from 'src/app/validators/custom-validators';
import { UsernameDuplicateValidator } from 'src/app/validators/username-duplicate.validator';

@Component({
  selector: 'app-admin-account-form',
  templateUrl: './admin-account-form.component.html',
  styleUrls: ['./admin-account-form.component.scss']
})
export class AdminAccountFormComponent implements OnInit, OnDestroy {

  @Input() admin$: Observable<Admin>;
  @Output() formSubmitEvent = new EventEmitter<Admin>();

  public accountForm: FormGroup;
  private unsubscribe$ = new Subject();

  constructor(private readonly dupeValidator: UsernameDuplicateValidator) { }

  ngOnInit() {
    this.accountForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      password: new FormControl('', [CustomValidators.password(6, 20)]),
      emailAddress: new FormControl('', [Validators.required, Validators.maxLength(100), CustomValidators.emailAddress]),
      confirmationPassword: new FormControl('', [CustomValidators.password(6, 20)]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      active: new FormControl(true)
    });

    this.accountForm.get('password').validator = Validators.compose([
      this.accountForm.get('password').validator,
      CustomValidators.equal(this.accountForm.get('confirmationPassword'))
    ]);

    this.accountForm.get('confirmationPassword').validator = Validators.compose([
      this.accountForm.get('confirmationPassword').validator,
      CustomValidators.equal(this.accountForm.get('password'))
    ]);


    // populate form if we have a vendor bound to the form
    if (this.admin$) {
      this.admin$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((result: Admin) => {
          this.accountForm.patchValue(result);
          this.accountForm.patchValue(result.userAccount);

          this.accountForm.get('userName').asyncValidator =
            this.dupeValidator.checkUsername
              .bind(this.dupeValidator, this.accountForm.get('userName'), result.userAccount.userName);

        });
    } else {
      // require a password for creating a admin
      this.accountForm.get('password').validator = Validators.compose([
        this.accountForm.get('password').validator, Validators.required
      ]);

      this.accountForm.get('confirmationPassword').validator = Validators.compose([
        this.accountForm.get('confirmationPassword').validator, Validators.required
      ]);

      this.accountForm.get('userName').asyncValidator = this.dupeValidator.checkUsername.bind(this.dupeValidator);
    }

  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  onSubmit() {

    if (!this.accountForm.valid) {
      return;
    }

    const admin = this.buildAdmin();

    this.formSubmitEvent.emit(admin);
  }

  private buildAdmin(): Admin {

    const admin = new Admin();
    admin.userAccount = new UserAccount();

    admin.userAccount.type = AccountType.Admin;
    admin.userAccount.userName = this.accountForm.controls['userName'].value;
    admin.userAccount.password = this.accountForm.controls['password'].value;
    admin.userAccount.confirmationPassword = this.accountForm.controls['confirmationPassword'].value;
    admin.userAccount.emailAddress = this.accountForm.controls['emailAddress'].value;
    admin.userAccount.active = this.accountForm.controls['active'].value;

    admin.firstName = this.accountForm.controls['firstName'].value;
    admin.lastName = this.accountForm.controls['lastName'].value;

    return admin;
  }
}
