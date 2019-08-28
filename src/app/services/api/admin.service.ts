import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Admin } from '../../models/admin.model';
import { AdminStoreService } from 'src/app/store/admin-store.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = `${environment.api_url}/admin`;

  constructor(
    private readonly http: HttpClient,
    private readonly store: AdminStoreService) {
  }

  getAll(): Observable<Admin[]> {

    const admins = this.store.getAll();

    if (admins) {
      return of(admins);
    }

    return this.http
      .get<Admin[]>(this.url)
      .pipe(tap((data: Admin[]) => this.store.set(data)));
  }

  get(id: number): Observable<Admin> {

    const admin = this.store.get(id);

    if (admin) {
      return of(admin);
    }

    return this.http
      .get<Admin>(`${this.url}/${id}`)
      .pipe(tap((data: Admin) => this.store.add(data)));
  }

  post(admin: Admin): Observable<Admin> {
    return this.http
      .post<Admin>(this.url, admin)
      .pipe(tap((data: Admin) => this.store.add(data)));
  }

  put(id: number, admin: Admin): Observable<{ adminId: number }> {
    return this.http
      .put<{ adminId: number }>(`${this.url}/${id}`, admin)
      .pipe(tap(() => this.store.update(admin)));
  }

}
