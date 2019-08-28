import { Pipe, PipeTransform } from '@angular/core';

import { InsuranceType } from '../models/enums/insurance-type.enum';

@Pipe({
  name: 'insuranceType'
})
export class InsuranceTypePipe implements PipeTransform {

  transform(value: InsuranceType, args?: any): any {
    switch (value) {
      case InsuranceType.MEDICARE: {
        return 'MEDICARE';
      }
      case InsuranceType.PRIVATE: {
        return 'PRIVATE';
      }
      default: {
        return 'NONE';
      }
    }
  }

}
