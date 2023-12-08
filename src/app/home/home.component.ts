import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelComponent } from './panel/panel.component';
import { Product } from '../interfaces/products.interface';
import { ProductService } from '../services/product.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BudgetService } from '../services/budget.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PanelComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {



  public products: Product[] = this.productService.products;
  public addProducts: number = 0;
  public total: number = 0;
  public productPrice: number = 0;
  public initialPrice: number = this.budgetService.extraProducts(1,1);
  public extras: number[] = [1, 1];

  public checkStatus: boolean [] = [false];
  public finalBudget: number = 0;

  constructor(public productService: ProductService, public budgetService: BudgetService){}


  //TODO: Checkbox form:

  checkForm = new FormGroup({
    c0: new FormControl(false),
    c1: new FormControl(false),
    c2: new FormControl(false),
  },
  {

  });


  onCheckboxChange(){
    this.checkForm.valueChanges.subscribe(()=>{
      this.updateBudget()
    })
  }

  updateBudget(){

    if (this.checkForm.get('c0')?.value) {
      this.addProducts += this.products[0].price;
      this.checkStatus [0] = true;

    } else this.checkStatus[0] = false;

    if (this.checkForm.get('c1')?.value) {
      this.addProducts += this.products[1].price;
      this.checkStatus [1] = true;

    } else this.checkStatus[0] = false;

    if (this.checkForm.get('c2')?.value) {
      this.addProducts += this.products[2].price;
      this.checkStatus [2] = true;

    }else{
      this.checkStatus[2] = false;
      this.finalBudget = 0;
    }
  }

  budgetAndExtra(productAndExtra: number[]){
    this.addProducts -= this.productPrice;
    this.productPrice = productAndExtra[0]-this.initialPrice;

    this.addProducts+= this.productPrice;
    [this.extras[0], this.extras[1]] = productAndExtra.slice(1, 3);
  }

}
