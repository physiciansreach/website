import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { States } from 'src/app/constants/states';
import { Address } from 'src/app/models/address.model';
import { AccountType } from 'src/app/models/enums/account-type.enum';
import { Physician } from 'src/app/models/physician.model';
import { UserAccount } from 'src/app/models/user-account.model';
import { FormatHelperService } from 'src/app/services/format-helper.service';
import { MaskService } from 'src/app/services/mask.service';
import { CustomValidators } from 'src/app/validators/custom-validators';
import { UsernameDuplicateValidator } from 'src/app/validators/username-duplicate.validator';

@Component({
  selector: 'app-physician-account-form',
  templateUrl: './physician-account-form.component.html',
  styleUrls: ['./physician-account-form.component.scss']
})
export class PhysicianAccountFormComponent implements OnInit, OnDestroy {

  @Input() physician$: Observable<Physician>;
  @Output() formSubmitEvent = new EventEmitter<Physician>();

  public states = States;
  public accountForm: FormGroup;
  private unsubscribe$ = new Subject();

  constructor(
    public readonly maskService: MaskService,
    public readonly formatHelper: FormatHelperService,
    private readonly dupeValidator: UsernameDuplicateValidator) {

  }

  ngOnInit() {
    this.accountForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      password: new FormControl('', [CustomValidators.password(6, 20)]),
      confirmationPassword: new FormControl('', [CustomValidators.password(6, 20)]),
      emailAddress: new FormControl('', [Validators.required, Validators.maxLength(100), CustomValidators.emailAddress]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      dea: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      npi: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      phoneNumber: new FormControl('', [CustomValidators.phonenumber, Validators.required]),
      faxNumber: new FormControl('', [CustomValidators.phonenumber, Validators.required]),
      addressLineOne: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      addressLineTwo: new FormControl('', Validators.maxLength(100)),
      city: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      state: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [CustomValidators.zip, Validators.required]),
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

    if (this.physician$) {
      // populate form for editing the physician
      this.physician$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((result: Physician) => {
          this.accountForm.patchValue(result);
          this.accountForm.patchValue(result.userAccount);
          this.accountForm.patchValue(result.address);

          this.accountForm.patchValue({
            state: this.states.find(s => s === result.address.state.toUpperCase())
          });

          this.accountForm.get('userName').asyncValidator =
            this.dupeValidator.checkUsername
              .bind(this.dupeValidator, this.accountForm.get('userName'), result.userAccount.userName);
        });
    } else {

      // check for duplicate username
      this.accountForm.get('userName').asyncValidator = this.dupeValidator.checkUsername.bind(this.dupeValidator);

      // require a password for creating a physician
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

    const physician = this.buildPhysician();

    this.formSubmitEvent.emit(physician);
  }


  private buildPhysician(): Physician {

    const physician = new Physician();
    physician.userAccount = new UserAccount();
    physician.address = new Address();

    physician.userAccount.type = AccountType.Physician;
    physician.userAccount.userName = this.accountForm.controls['userName'].value;
    physician.userAccount.password = this.accountForm.controls['password'].value;
    physician.userAccount.confirmationPassword = this.accountForm.controls['confirmationPassword'].value;
    physician.userAccount.emailAddress = this.accountForm.controls['emailAddress'].value;
    physician.userAccount.active = this.accountForm.controls['active'].value;


    physician.firstName = this.accountForm.controls['firstName'].value;
    physician.lastName = this.accountForm.controls['lastName'].value;
    physician.dea = this.accountForm.controls['dea'].value;
    physician.npi = this.accountForm.controls['npi'].value;

    physician.phoneNumber = this.formatHelper.toNumbersOnly(this.accountForm.controls['phoneNumber'].value);
    physician.faxNumber = this.formatHelper.toNumbersOnly(this.accountForm.controls['faxNumber'].value);

    physician.address.addressLineOne = this.accountForm.controls['addressLineOne'].value;
    physician.address.addressLineTwo = this.accountForm.controls['addressLineTwo'].value;
    physician.address.city = this.accountForm.controls['city'].value;
    physician.address.state = this.accountForm.controls['state'].value;
    physician.address.zipCode = this.accountForm.controls['zipCode'].value;

    return physician;
  }
}
