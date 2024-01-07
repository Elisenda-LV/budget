import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetService } from '../services/budget.service';
import { Budget } from '../interfaces/budget.interface';
import { HomeComponent } from '../home/home.component';
import { PanelComponent } from '../home/panel/panel.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorsService } from '../services/validators.service';


@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    PanelComponent,
    FormsModule,
    ReactiveFormsModule,

  ],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.scss'
})


export class BudgetListComponent {

  constructor (public budgetService: BudgetService, public validatorsService: ValidatorsService){}

  public signalArray = this.budgetService.budgetArray;
  public budgetFound: Budget[] = [];


  //TODO: Métodes  per filtrar pressupostos:

  byPrice(): void {
    this.signalArray().sort((a: Budget, b: Budget) => b.price - a.price);
  }

  byName(): void {
    this.signalArray().sort((a: Budget, b: Budget) => {
      const nA = a.name.toUpperCase();
      const nB = b.name.toUpperCase();

      if (nA < nB) {
        return -1;
      }
      if (nA > nB) {
        return 1;
      }

      return 0;
    });
  }


  byDate(): void {
    this.signalArray().sort((a: Budget, b: Budget) => {
      if (a.date < b.date) return 1;
      else return -1;
    });
  }

  //TODO: buscador

  searchForm = new FormGroup({
    search : new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern(this.validatorsService.namePattern)])

  })


  searchBudget():void {
    let searchB = this.searchForm.get('search')!.value?.toLowerCase() || '';
    this.budgetFound = this.signalArray().filter(budget => budget.name.toLowerCase() == searchB);

  }

}

