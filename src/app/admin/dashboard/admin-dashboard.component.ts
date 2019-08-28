import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  public lastTabIndex$: Observable<number> = this.session.lastTabIndex$;

  constructor(private readonly session: SessionService) { }

  ngOnInit() {

  }

  public onTabChange(event: MatTabChangeEvent) {
    this.session.lastTabIndex$.next(event.index);
  }

}
