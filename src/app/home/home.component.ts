
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';

import { PanelComponent } from './panel/panel.component';
import { Product } from '../interfaces/products.interface';
import { ProductService } from '../services/product.service';
import { BudgetService } from '../services/budget.service';
import { BudgetListComponent } from '../budget-list/budget-list.component';
import { Budget } from '../interfaces/budget.interface';
import { ValidatorsService } from '../services/validators.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PanelComponent,
    ReactiveFormsModule,
    FormsModule,
    BudgetListComponent,
    NgStyle,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent implements OnInit  {

  //TODO: Declarar variables:

  public products: Product[] = this.productService.products;
  public addProducts: number = 0;

  public productPrice: number = 0;
  public initialPrice: number = this.budgetService.extraProducts(1,1);
  public extras: number[] = [1, 1];

  public checkStatus: boolean [] = [false];
  public submitForm: boolean  =  false;
  public formServices= 0;


  //TODO: Vincular Services:

  constructor(
    public productService: ProductService,
    public budgetService: BudgetService,
    public validatorsService: ValidatorsService,

  ){}


  //TODO: Crear Checkbox form:

  checkForm = new FormGroup({
    c0: new FormControl(false, [Validators.required, Validators.requiredTrue]),
    c1: new FormControl(false, [Validators.required, Validators.requiredTrue]),
    c2: new FormControl(false, [Validators.required, Validators.requiredTrue]),
  });

  //TODO: Abans de crear ngOnInite hem afegit extends OnInit, per iniciar el cicle de vida:

  ngOnInit(): void {
    this.checkForm.valueChanges.subscribe(()=>{
      this.updateBudget();

      console.log(this.addProducts)
    })

  }

  budgetAndExtra(productAndExtra: number[]){
    this.addProducts -= this.productPrice;
    this.productPrice = productAndExtra[0]-this.initialPrice;

    this.addProducts+= this.productPrice;
    [this.extras[0], this.extras[1]] = productAndExtra.slice(1, 3);

    console.table(this.addProducts)
  }


  updateBudget(){

    this.addProducts= 0;

    if (this.checkForm.get('c0')?.value) {
      this.addProducts += this.products[0].price;
      this.checkStatus [0] = true;


    } else {
      this.checkStatus[0] = false;
    }

    if (this.checkForm.get('c1')?.value) {
      this.addProducts += this.products[1].price;
      this.checkStatus [1] = true;

    } else {
      this.checkStatus[0] = false;
    }

    if (this.checkForm.get('c2')?.value) {
      this.addProducts += this.products[2].price;
      this.checkStatus [2] = true;

    }else{
      this.checkStatus[2] = false;
      this.productPrice= 0;

    }
  }


  //TODO: Crear budgetForm, validators i custom validators (creem carpeta custom-validators)

  budgetForm = new FormGroup ({
    name: new FormControl ('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)
    ]),

    phone: new FormControl ('', [
      Validators.required,
      Validators.pattern(this.validatorsService.phonePattern)

    ]),

    email: new FormControl ('', [
      Validators.required,
      Validators.pattern(this.validatorsService.emailPattern)
    ]),

  });

  //TODO: Métode per enviar dades formulari al array amb signals (ubicada al service)

  onSave(): void{

    this.submitForm = true;


    let formServices : string[] = this.productService.products.filter((product, index) => this.checkStatus[index])
                                                              .map(product => (product.title));
    let budget: Budget = {
      name: this.budgetForm.get('name')!.value || '',
      email: this.budgetForm.get('email')!.value || '',
      phoneNumber: this.budgetForm.get('phone')!.value || '',
      services: formServices,
      price: this.addProducts,
      date: new Date()
    }

    if(this.budgetForm.valid){
      this.budgetService.budgetArray.update(budgets => [...budgets, budget]);
      setTimeout(() => {
        this.budgetForm.reset();
        this.checkForm.reset();

      }, 200);

      this.submitForm = false;

      console.table(this.budgetService.budgetArray);
      console.table(budget);
    }

  }


  //TODO: validacions formulari:

  public isValidField(field: string) {
    const formControl = this.budgetForm.get(field);
    return formControl && formControl.errors && formControl.touched;
  }

}
