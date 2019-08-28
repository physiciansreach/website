import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { RouteUrls } from '../constants/routes';
import { AccountType } from '../models/enums/account-type.enum';
import { UserAccount } from '../models/user-account.model';
import { LoginService } from '../services/api/login.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  private unsubscribe$ = new Subject();

  constructor(
    private readonly router: Router,
    private readonly loginApi: LoginService,
    private readonly session: SessionService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    const user = new UserAccount();
    user.userName = this.loginForm.controls['username'].value;
    user.password = this.loginForm.controls['password'].value;

    this.loginApi.post(user).subscribe(
      (result: UserAccount) => {

        if (result.errors && result.errors.length >= 1 && result.errors[0]) {
          this.loginForm.setErrors({ 'fail': true });
          return;
        }

        this.session.userAccount$.next(result);
        this.session.loggedIn$.next(true);

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

}
