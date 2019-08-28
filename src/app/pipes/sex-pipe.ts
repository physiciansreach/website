import { Pipe, PipeTransform } from '@angular/core';

import { SexType } from '../models/enums/sex-type.enum';

@Pipe({
  name: 'sex'
})
export class SexPipe implements PipeTransform {

  transform(value: SexType, args?: any): any {
    switch (value) {
      case SexType.Male: {
        return 'Male';
      }
      case SexType.Female: {
        return 'Female';
      }
      default: {
        return 'NA';
      }
    }
  }

}
