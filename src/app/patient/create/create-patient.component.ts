import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/api/patient.service';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.scss']
})
export class CreatePatientComponent implements OnDestroy {

  private unsubscribe$ = new Subject();

  constructor(
    private readonly patientApi: PatientService,
    private readonly router: Router) { }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  onSubmit(patient: Patient) {
    this.patientApi
      .post(patient)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((newPatient: Patient) => {
        const route = ['patient/', newPatient.patientId, 'pain-dme-only'];
        this.router.navigate(route);
      });
  }

}
