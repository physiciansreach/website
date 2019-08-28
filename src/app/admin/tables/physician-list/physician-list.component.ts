import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Physician } from 'src/app/models/physician.model';
import { PhysicianService } from 'src/app/services/api/physician.service';

@Component({
  selector: 'app-physician-list',
  templateUrl: './physician-list.component.html',
  styleUrls: ['./physician-list.component.scss']
})
export class PhysicianListComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;

  private unsubscribe$ = new Subject();

  public datasource: MatTableDataSource<Physician>;
  public columnsToDisplay = ['userId', 'userName', 'firstName', 'lastName', 'phoneNumber', 'active', 'edit'];

  constructor(
    private readonly physicianApi: PhysicianService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.physicianApi
      .getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((physicians: Physician[]) => {
        this.datasource = new MatTableDataSource(physicians);
        this.datasource.sort = this.sort;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  edit(id: number) {
    this.router.navigate(['physician/edit', id], { relativeTo: this.activatedRoute });
  }

  add() {
    this.router.navigate(['physician/create'], { relativeTo: this.activatedRoute });
  }
}
