import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StoreState } from 'src/app/store/store-state';

import { environment } from '../../../environments/environment';
import { Vendor } from '../../models/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService extends ObservableStore<StoreState>  {

  private url = `${environment.api_url}/vendor`;

  constructor(private http: HttpClient) {
    super({ trackStateHistory: true });
  }

  getAll(): Observable<Vendor[]> {

    const state = this.getState();

    if (state && state.vendors) {
      return of(state.vendors);
    } else {
      return this.fetchAll();
    }
  }

  private fetchAll(): Observable<Vendor[]> {

    return this.http
      .get<Vendor[]>(this.url)
      .pipe(
        tap((data: Vendor[]) => {
          this.setState({ vendors: data }, 'vendor-get-all');
        }));
  }

  get(id: number): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.url}/${id}`);
  }

  post(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(this.url, vendor);
  }

  put(id: number, vendor: Vendor): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.url}/${id}`, vendor);
  }
}
