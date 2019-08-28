import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IPAddressService {

  constructor(private http: HttpClient) { }

  getIpAddress(): Observable<string> {

    return this.http
      .get('https://api.ipify.org?format=json')
      .pipe(map(response => {

        if (response['ip']) {
          return response['ip'];
        }
        return '';
      }));
  }
}
