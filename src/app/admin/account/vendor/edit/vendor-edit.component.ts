import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Vendor } from 'src/app/models/vendor.model';
import { VendorService } from 'src/app/services/api/vendor.service';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.scss']
})
export class VendorEditComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();
  public vendor$: Observable<Vendor>;
  public id: number;

  constructor(
    private readonly vendorApi: VendorService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.vendor$ = this.vendorApi.get(this.id);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  onSubmit(vendor: Vendor) {
    this.vendorApi
      .put(this.id, vendor)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.router.navigate(['/admin']));
  }
}
