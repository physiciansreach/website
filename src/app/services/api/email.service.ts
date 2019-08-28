import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  post(documentId: number, emailAddress: string): Observable<boolean> {
    return this.http.post<boolean>(`${environment.api_url}/email`, { documentId: documentId, emailAddress: emailAddress });
  }
}
