import { Injectable, signal } from '@angular/core';
import { Budget } from '../interfaces/budget.interface';

@Injectable({providedIn: 'root'})


export class BudgetService {

  //TODO: Array que recull dades del budgetForm (ubicat a HomeComponent) i les envia a budget-list per a que mostri les dades.
  public budgetArray = signal <Budget[]>([])

  showBudget(budget: Budget){
    return this.budgetArray.length;
  }



  //TODO: Arrays pel Modal.
  public helpWeb = [
    'Número de pàgines',
    'Afegeix el número de pàgines que tindrà el teu projecte. El cost total del servei depèn del número de pàgines.'
  ]

  public helpLang = [
    'Número d´idiomes',
    'Afegeix el número de llenguatges que tindrà el teu projecte. El cost de cada llenguatge és de 30€.'
  ]

  //TODO: Métode per calcular import de productes extres.

  extraProducts(nLangs:number, nWebs:number): number {
    return nLangs * nWebs * 30;

  }

  constructor() { }

}
