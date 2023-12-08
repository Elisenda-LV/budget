import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})


export class BudgetService {

  public helpWeb = [
    'Número de pàgines',
    'Afegeix el número de pàgines que tindrà el teu projecte. El cost total del servei depèn del número de pàgines.'
  ]

  public helpLang = [
    'Número d´idiomes',
    'Afegeix el número de llenguatges que tindrà el teu projecte. El cost de cada llenguatge és de 30€.'
  ]


  extraProducts(nLangs:number, nWebs:number): number {
    return nLangs * nWebs * 30;

  }
  constructor() { }

}
