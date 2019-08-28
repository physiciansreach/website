import { Injectable } from '@angular/core';

import { LogoutService } from './logout.service';


@Injectable({
  providedIn: 'root'
})
export class LogoutTimerService {

    public timeoutInMilliseconds = 600000;
    private timeoutId;
    constructor(private readonly logout: LogoutService) { }

    startTimer() {
        this.timeoutId = window.setTimeout(this.goInactive, this.timeoutInMilliseconds, this.logout);
    }

    resetTimer() {
        window.clearTimeout(this.timeoutId);
        this.startTimer();
    }

    private goInactive(logout: LogoutService) {
        logout.logout();
    }
}
