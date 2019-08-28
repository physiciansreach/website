import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AccountType } from '../models/enums/account-type.enum';
import { UserAccount } from '../models/user-account.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly session: SessionService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    const expectedRoles = next.data.expectedRoles as AccountType[];

    return this.session.userAccount$.pipe(
      take(1),
      map((account: UserAccount) => {

        const foundRole = expectedRoles.filter(r => r === account.type);

        if (foundRole && foundRole.length > 0) {
          return true;
        }

        this.router.navigate(['/login']);
        return false;
      })
    );

  }
}
