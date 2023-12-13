import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetService } from '../services/budget.service';
import { Budget } from '../interfaces/budget.interface';
import { HomeComponent } from '../home/home.component';
import { PanelComponent } from '../home/panel/panel.component';


@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    PanelComponent,

  ],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.scss'
})


export class BudgetListComponent {


  constructor(public budgetService: BudgetService){}

  public budgets = this.budgetService.budgetArray;




//TODO: Métodes  per filtres pressupostos:

  byPrice(): void {
    this.budgets().sort((a: Budget, b: Budget) => b.price - a.price);
  }

  byName(): void {
    this.budgets().sort((a: Budget, b: Budget) => {
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
    this.budgets().sort((a: Budget, b: Budget) => {
      if (a.date < b.date) return 1;
      else return -1;
    });
  }

}
