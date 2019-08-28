import { Pipe, PipeTransform } from '@angular/core';

import { IntakeStatus } from '../models/enums/intake-status.enum';

@Pipe({
  name: 'intakeStatus'
})
export class IntakeStatusPipe implements PipeTransform {

  transform(value: IntakeStatus, args?: any): any {
    switch (value) {
      case IntakeStatus.New: {
        return 'New';
      }
      case IntakeStatus.Assigned: {
        return 'Assigned';
      }
      case IntakeStatus.UnderReview: {
        return 'Under Review';
      }
      case IntakeStatus.Approved: {
        return 'Approved';
      }
      case IntakeStatus.Denied: {
        return 'Denied';
      }
      case IntakeStatus.Downloaded: {
        return 'Downloaded';
      }
      default: {
        return 'New';
      }
    }
  }

}
