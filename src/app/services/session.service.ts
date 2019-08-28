import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { UserAccount } from '../models/user-account.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public userAccount$: BehaviorSubject<UserAccount> = new BehaviorSubject<UserAccount>(new UserAccount());
  public loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public lastTabIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public authToken$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  clear() {
    this.userAccount$.next(new UserAccount());
    this.loggedIn$.next(false);
    this.lastTabIndex$.next(0);
    this.authToken$.next('');
  }
}
