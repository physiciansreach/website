import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Signature } from 'src/app/models/signature.model';

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SignatureService {

    constructor(private http: HttpClient) { }

    put(intakeFormId: number, signature: Signature): Observable<{ signatureId: string }> {
        return this.http.post<{ signatureId: string }>(`${environment.api_url}/intakeform/${intakeFormId}/signature`, signature);
    }
}
