import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  private url = `${environment.api_url}/UserAccount`;

  constructor(private http: HttpClient) { }

  exists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/${username}`);
  }


}
