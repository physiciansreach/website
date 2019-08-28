import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Admin } from 'src/app/models/admin.model';

import { AdminService } from '../../../../services/api/admin.service';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.scss']
})
export class AdminCreateComponent implements OnDestroy {

  private unsubscribe$ = new Subject();

  constructor(
    private readonly adminApi: AdminService,
    private readonly router: Router) { }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  onSubmit(admin: Admin) {
    this.adminApi
      .post(admin)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.router.navigate(['/admin']));
  }

}
