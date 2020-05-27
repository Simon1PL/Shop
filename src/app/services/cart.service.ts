import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  productsInCart: Map<Product, number> = new Map();

  addProduct(product: Product, ammount: number): void {
    this.productsInCart.set(product, ammount);
  }

  deleteProduct(product: Product): void {
    this.productsInCart.delete(product);
  }

  getProductAmmount(product: Product): number {
    return this.productsInCart.get(product);
  }

  getProducts(): Map<Product, number> {
    return this.productsInCart;
  }

  constructor() { }
}
