import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RouteUrls } from './constants/routes';
import { AccountType } from './models/enums/account-type.enum';
import { UserAccount } from './models/user-account.model';
import { LogoutTimerService } from './services/logout-timer.service';
import { LogoutService } from './services/logout.service';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public loggedIn$ = this.session.loggedIn$;
  public userAccount$ = this.session.userAccount$;
  private unsubscribe$ = new Subject();

  constructor(
    private titleService: Title,
    private readonly router: Router,
    private readonly session: SessionService,
    private readonly logoutService: LogoutService,
    private readonly logoutTimer: LogoutTimerService) {

  }

  ngOnInit(): void {

    this.titleService.setTitle('Physicians Reach');
    this.logoutTimer.startTimer();

    this.router.events
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  singOutClick() {
    this.logoutService.logout();
  }

  home() {
    this.session.userAccount$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: UserAccount) => {

          if (result.type === AccountType.Admin) {
            this.router.navigateByUrl('admin');
          }

          if (result.type === AccountType.Agent) {
            this.router.navigateByUrl(RouteUrls.AgentDashboardComponent);
          }

          if (result.type === AccountType.Physician) {
            this.router.navigateByUrl(RouteUrls.PhysicianDashboardComponent);
          }
        });

  }

  billing() {
    this.router.navigateByUrl(RouteUrls.BillingDashboardComponent);
  }


  // keep logout timer alive
  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:mousedown', ['$event'])
  @HostListener('document:mousewheel', ['$event'])
  @HostListener('document:keydown', ['$event'])
  userInputHandler(event: KeyboardEvent) {

    this.logoutTimer.resetTimer();
  }

}
