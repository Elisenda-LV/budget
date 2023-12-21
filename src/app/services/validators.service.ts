import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class ValidatorsService {

  public namePattern: string = '([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public phonePattern: string = "[0-9]{9}"  ;

  constructor() { }

}



