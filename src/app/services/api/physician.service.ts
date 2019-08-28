import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Physician } from '../../models/physician.model';
import { PhysicianStoreService } from 'src/app/store/physician-store.service ';

@Injectable({
  providedIn: 'root'
})
export class PhysicianService {

  private url = `${environment.api_url}/physician`;

  constructor(
    private readonly http: HttpClient,
    private readonly store: PhysicianStoreService) {
  }

  getAll(): Observable<Physician[]> {

    const physicians = this.store.getAll();

    if (physicians) {
      return of(physicians);
    }

    return this.http
      .get<Physician[]>(this.url)
      .pipe(tap((data: Physician[]) => this.store.set(data)));
  }

  get(id: number): Observable<Physician> {

    const physician = this.store.get(id);

    if (physician) {
      return of(physician);
    }

    return this.http
      .get<Physician>(`${this.url}/${id}`)
      .pipe(tap((data: Physician) => this.store.add(data)));
  }

  post(physician: Physician): Observable<Physician> {
    return this.http
      .post<Physician>(this.url, physician)
      .pipe(tap((data: Physician) => this.store.add(data)));
  }

  put(id: number, physician: Physician): Observable<{ physicianId: number }> {
    return this.http
      .put<{ physicianId: number }>(`${this.url}/${id}`, physician)
      .pipe(tap(() => this.store.update(physician)));
  }

  getList(ids: number[]): Observable<Physician[]> {

    const physicians = this.store.getList(ids);

    if (physicians && physicians.length === ids.length) {
      return of(physicians);
    }

    let queryString = '';

    ids.forEach(id => queryString += `\&ids=${id}`);

    return this.http
      .get<Physician[]>(`${this.url}?${queryString}`)
      .pipe(tap((data: Physician[]) => this.store.updateList(data)));
  }
}
