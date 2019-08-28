import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public readonly router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem('jwt');

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + idToken)
            });

            return next.handle(cloned).pipe(
                map(event => {
                    return event;
                }),
                catchError(err => {
                    if (err.status === 401) {
                        this.router.navigate(['/login']);
                    }
                    return throwError(err);
                }));

        } else {
            return next.handle(req).pipe(
                map(event => {
                    return event;
                }),
                catchError(err => {
                    if (err.status === 401) {
                        this.router.navigate(['/login']);
                    }
                    return throwError(err);
                }));
        }
    }
}

