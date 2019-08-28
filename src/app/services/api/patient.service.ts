import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Patient } from 'src/app/models/patient.model';
import { PatientStoreService } from 'src/app/store/patient-store.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private url = `${environment.api_url}/patient`;

  constructor(
    private readonly http: HttpClient,
    private readonly store: PatientStoreService) {
  }

  getAll(): Observable<Patient[]> {

    const patients = this.store.getAll();

    if (patients) {
      return of(patients);
    }

    return this.http
      .get<Patient[]>(this.url)
      .pipe(tap((data: Patient[]) => this.store.set(data)));
  }

  get(id: number): Observable<Patient> {

    const patient = this.store.get(id);

    if (patient) {
      return of(patient);
    }

    return this.http
      .get<Patient>(`${this.url}/${id}`)
      .pipe(tap((data: Patient) => this.store.add(data)));
  }

  post(patient: Patient): Observable<Patient> {
    return this.http
      .post<Patient>(this.url, patient)
      .pipe(tap((data: Patient) => this.store.add(data)));
  }

  put(id: number, patient: Patient): Observable<{ patientId: number }> {
    return this.http
      .put<{ patientId: number }>(`${this.url}/${id}`, patient)
      .pipe(tap(() => this.store.update(patient)));
  }

  getByAgent(agentId: number): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${environment.api_url}/agent/${agentId}/patient`);
  }

  getByVendor(vendorId: number): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${environment.api_url}/vendor/${vendorId}/patient`);
  }

  getList(ids: number[]): Observable<Patient[]> {

    const patients = this.store.getList(ids);

    if (patients && patients.length === ids.length) {
      return of(patients);
    }

    let queryString = '';

    ids.forEach(id => queryString += `\&ids=${id}`);

    return this.http
      .get<Patient[]>(`${this.url}?${queryString}`)
      .pipe(tap((data: Patient[]) => this.store.updateList(data)));
  }
}
