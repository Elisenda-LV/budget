import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { PanelComponent } from '../../home/panel/panel.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    PanelComponent,

  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})


export class ModalComponent {

  @Input()

  public modalText: string = '';
  public title: string = '';
  public description: string = '';

//TODO: 1- Crear constructor con NgbActiveModal y vincular budgetService

constructor(public activeModal: NgbActiveModal, public budgetService: BudgetService){}


//TODO: 2- Métodos para añadir textos al modal.

  addTitle(): string {
    if(this.modalText === 'webs')
      return this.budgetService.helpWeb[0];
    else if(this.modalText === 'langs')
      return this.budgetService.helpLang[0];

      return this.title
  }

  addText():string {
    if(this.modalText === 'webs')
      return this.budgetService.helpWeb[1];
    else if(this.modalText === 'langs')
      return this.budgetService.helpLang[1];

      return this.description
  }



}


