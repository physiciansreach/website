import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaskService {

  // (555) 555-5555
  public phonenumber = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  // FL
  public state = {
    mask: [/[a-zA-Z]/, /[a-zA-Z]/],
    pipe: (rawValue, config) => rawValue.toLocaleUpperCase()
  };

  // 80112
  public zip = [/\d/, /\d/, /\d/, /\d/, /\d/];

  // 80112
  public bin = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

  // 02-15-1985
  public date = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

}
