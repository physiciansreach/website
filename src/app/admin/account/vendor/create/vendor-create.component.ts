import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Vendor } from 'src/app/models/vendor.model';
import { VendorService } from 'src/app/services/api/vendor.service';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.scss']
})
export class VendorCreateComponent implements OnDestroy {

  private unsubscribe$ = new Subject();

  constructor(
    private readonly vendorApi: VendorService,
    private readonly router: Router) { }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  onSubmit(vendor: Vendor) {

    this.vendorApi
      .post(vendor)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.router.navigate(['/admin']));
  }

}
