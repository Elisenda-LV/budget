import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { HomeComponent } from '../home.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { BudgetService } from '../../services/budget.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    ModalComponent,
    FormsModule,
    ReactiveFormsModule,

  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {

  panelForm: FormGroup

  //TODO: 0-Enviar info a Home de parent to child

  @Output() productPrice = new EventEmitter<number[]>();

  //TODO: 1-Crear panelForm

  constructor(public productService: ProductService, public budgetService: BudgetService, private modalService: NgbModal){
    this.panelForm = new FormGroup({
      nLangs: new FormControl (1, [Validators.required, Validators.min(1), Validators.max(20)]),
      nWebs: new FormControl (1, [Validators.required, Validators.min(1), Validators.max(20)]),
    })
  }

  //TODO: 2-Emitir a Home

  ngOnInit(): void {
    this.panelForm.valueChanges.subscribe(()=>{
      const nWebs = this.panelForm.get('nWebs')?.value;
      const nLangs = this.panelForm.get('nLangs')?.value;

      if (this.panelForm.valid) {
        const extra = this.budgetService.extraProducts(nLangs, nWebs);
        this.productPrice.emit([extra, nWebs, nLangs]);
      }
    })

  }


  //TODO: 3-Métodos botones

  addLanguage():void {
    const nLangs = this.panelForm.get('nLangs');

    if(nLangs){
      const actualNum = nLangs.value || 1;
      nLangs.setValue(actualNum + 1);
    }

  }

  subLanguage():void {
    const nLangs = this.panelForm.get('nLangs');

    if(nLangs){
      const actualNum = nLangs.value || 1;
      if (actualNum !== 1) nLangs.setValue(actualNum - 1);
    }

  }

  addWeb():void {
    const nWebs = this.panelForm.get('nWebs');

    if(nWebs){
      const actualNum = nWebs.value || 1;
      nWebs.setValue(actualNum + 1);
    }

  }

  subWeb():void {
    const nWebs  = this.panelForm.get('nWebs');

    if(nWebs){
      const actualNum = nWebs.value || 1;
      if(actualNum !== 1) nWebs.setValue(actualNum - 1);
    }

  }



  //TODO: 4-Show modal:

  showModal(modalText: string):void {
   const modalInfo = this.modalService.open(ModalComponent);
    modalInfo.componentInstance.modalText = modalText;
  }
}
