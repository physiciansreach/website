import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bool'
})
export class BoolPipe implements PipeTransform {

  transform(value: boolean, args?: any): any {
    switch (value) {
      case true: {
        return 'Yes';
      }
      case false: {
        return 'No';
      }
      default: {
        return 'No';
      }
    }
  }

}
