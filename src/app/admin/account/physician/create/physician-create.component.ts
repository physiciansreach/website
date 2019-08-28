import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Physician } from 'src/app/models/physician.model';
import { PhysicianService } from 'src/app/services/api/physician.service';


@Component({
  selector: 'app-physician-create',
  templateUrl: './physician-create.component.html',
  styleUrls: ['./physician-create.component.scss']
})
export class PhysicianCreateComponent implements OnDestroy {

  private unsubscribe$ = new Subject();

  constructor(
    private readonly physicianApi: PhysicianService,
    private readonly router: Router) { }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  onSubmit(physician: Physician) {
    this.physicianApi
      .post(physician)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.router.navigate(['/admin']));
  }

}
