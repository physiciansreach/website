import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    const areaCode = value.slice(0, 3);
    const firstSection = value.slice(3, 6);
    const secondSection = value.slice(6, 10);

    return `(${areaCode})-${firstSection}-${secondSection}`;
  }

}
