import { Injectable } from '@angular/core';
import { Product } from '../interfaces/products.interface';

@Injectable({providedIn: 'root'})

export class ProductService {

  public products: Product [] = [

    {
      title: 'Seo',
      description: 'Disseny de campanya SEO',
      price: 300,

    },

    {
      title:'Ads',
      description:'Disseny de campanya de publicitat',
      price: 400,

    },

    {
      title:'Web',
      description:'Programació web responsive completa',
      price: 500,

   },

  ];


  constructor() { }

}
