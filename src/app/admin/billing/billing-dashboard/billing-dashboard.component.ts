import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteUrls } from 'src/app/constants/routes';
import { IntakeStatus } from 'src/app/models/enums/intake-status.enum';

export class TableRow {
  intakeFormId: number;
  createdOn: string;
  status: IntakeStatus;
  physicianName: string;
  physicianState: string;
  vendorName: string;
  physicianPaid: boolean;
  vendorBilled: boolean;
  vendorPaid: boolean;
}

@Component({
  selector: 'app-billing-dashboard',
  templateUrl: './billing-dashboard.component.html',
  styleUrls: ['./billing-dashboard.component.scss']
})
export class BillingDashboardComponent implements OnInit {


  constructor(
    private readonly router: Router) { }

  ngOnInit() {

  }

  done() {
    this.router.navigateByUrl('admin');
  }

}
