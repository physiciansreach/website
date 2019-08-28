import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Admin } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/services/api/admin.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss']
})
export class AdminEditComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();
  public admin$: Observable<Admin>;
  public id: number;

  constructor(
    private readonly adminApi: AdminService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.admin$ = this.adminApi.get(this.id);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  onSubmit(admin: Admin) {
    this.adminApi
      .put(this.id, admin)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.router.navigate(['/admin']));
  }
}
