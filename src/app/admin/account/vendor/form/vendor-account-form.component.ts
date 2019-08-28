import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Vendor } from 'src/app/models/vendor.model';
import { FormatHelperService } from 'src/app/services/format-helper.service';
import { MaskService } from 'src/app/services/mask.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-vendor-account-form',
  templateUrl: './vendor-account-form.component.html',
  styleUrls: ['./vendor-account-form.component.scss']
})
export class VendorAccountFormComponent implements OnInit, OnDestroy {

  @Input() vendor$: Observable<Vendor>;
  @Output() formSubmitEvent = new EventEmitter<Vendor>();

  public accountForm: FormGroup;
  private unsubscribe$ = new Subject();

  constructor(
    public readonly maskService: MaskService,
    public readonly formatHelper: FormatHelperService
    ) { }

  ngOnInit() {
    this.accountForm = new FormGroup({
      companyName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      doingBusinessAs: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      phoneNumber: new FormControl('', [Validators.required, CustomValidators.phonenumber]),
      contactFirstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      contactLastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      active: new FormControl(true)
    });

    // populate form if we have a vendor bound to the form
    if (this.vendor$) {
      this.vendor$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((result: Vendor) => {
          this.accountForm.patchValue(result);
        });
    }

  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  onSubmit() {

    if (!this.accountForm.valid) {
      return;
    }

    const vendor = this.buildVendor();

    this.formSubmitEvent.emit(vendor);
  }

  private buildVendor(): Vendor {

    const vendor = new Vendor();
    vendor.active = this.accountForm.controls['active'].value;
    vendor.companyName = this.accountForm.controls['companyName'].value;
    vendor.doingBusinessAs = this.accountForm.controls['doingBusinessAs'].value;
    vendor.phoneNumber = this.formatHelper.toNumbersOnly(this.accountForm.controls['phoneNumber'].value);
    vendor.contactFirstName = this.accountForm.controls['contactFirstName'].value;
    vendor.contactLastName = this.accountForm.controls['contactLastName'].value;

    return vendor;
  }
}
