import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IntakeForm } from '../../models/intake-form.model';

@Injectable({
  providedIn: 'root'
})
export class IntakeFormService {

  private url = `${environment.api_url}/IntakeForm`;

  constructor(private http: HttpClient) { }

  get(id: number): Observable<IntakeForm> {
    return this.http.get<IntakeForm>(`${this.url}/${id}`);
  }

  getAll(): Observable<IntakeForm[]> {
    return this.http.get<IntakeForm[]>(`${this.url}`);
  }

  getByPhysician(physicianId: number): Observable<IntakeForm[]> {
    return this.http.get<IntakeForm[]>(`${environment.api_url}/physician/${physicianId}/intakeform`);
  }

  getByVendor(vendorId: number): Observable<IntakeForm[]> {
    return this.http.get<IntakeForm[]>(`${environment.api_url}/vendor/${vendorId}/intakeform`);
  }

  getByPatient(patientId: number): Observable<IntakeForm[]> {
    return this.http.get<IntakeForm[]>(`${environment.api_url}/patient/${patientId}/intakeform`);
  }

  post(intakeForm: IntakeForm): Observable<IntakeForm> {
    return this.http.post<IntakeForm>(this.url, intakeForm);
  }

  put(id: number, intakeForm: IntakeForm): Observable<IntakeForm> {
    return this.http.put<IntakeForm>(`${this.url}/${id}`, intakeForm);
  }
}
