import { Injectable } from '@angular/core';
import { Product } from '../interfaces/products.interface';

@Injectable({providedIn: 'root'})

export class ProductService {

  public products: Product [] = [

    {
      title: 'Seo',
      description: 'Programació d´una web responsive completa',
      price: 300,

    },

    {
      title:'Ads',
      description:'Programació d´una web responsive completa',
      price: 400,

    },

    {
      title:'Web',
      description:'Programació d´una web responsive completa',
      price: 500,

   },

  ];


  constructor() { }

}
