import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Physician } from 'src/app/models/physician.model';
import { PhysicianService } from 'src/app/services/api/physician.service';


@Component({
  selector: 'app-physician-edit',
  templateUrl: './physician-edit.component.html',
  styleUrls: ['./physician-edit.component.scss']
})
export class PhysicianEditComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();
  public physician$: Observable<Physician>;
  private id: number;

  constructor(
    private readonly physicianApi: PhysicianService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.physician$ = this.physicianApi.get(this.id);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  onSubmit(physician: Physician) {
    this.physicianApi
      .put(this.id, physician)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.router.navigate(['/admin']));
  }
}
