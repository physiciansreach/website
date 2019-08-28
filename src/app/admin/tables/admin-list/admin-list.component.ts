import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Admin } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/services/api/admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;

  private unsubscribe$ = new Subject();

  public datasource: MatTableDataSource<Admin>;
  public columnsToDisplay = ['userId', 'userName', 'firstName', 'lastName', 'active', 'edit'];

  constructor(
    private readonly adminApi: AdminService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.adminApi
      .getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((admins: Admin[]) => {
        this.datasource = new MatTableDataSource(admins);
        this.datasource.sort = this.sort;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  edit(id: number) {
    this.router.navigate(['admin/edit', id], { relativeTo: this.activatedRoute });
  }

  add() {
    this.router.navigate(['admin/create'], { relativeTo: this.activatedRoute });
  }
}
