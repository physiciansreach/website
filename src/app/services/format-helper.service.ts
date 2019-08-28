import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class FormatHelperService {

    constructor() { }

    public toNumbersOnly(value: string): string {

        let numbersOnlyString: string;

        numbersOnlyString = value.replace(/[^0-9\.]/g, '');

        return numbersOnlyString;
    }
}
