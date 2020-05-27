import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})

export class ShoppingCartComponent implements OnInit {
  productsAmmount: Map<Product, number>;
  products: Product[];
  seeElement: Product;

  calculateSum(): number {
    let sum = 0;
    // tslint:disable-next-line: forin
    for (const product of this.productsAmmount.keys()) {
        const ammount = this.productsAmmount.get(product);
        sum += ammount * product.priceInPln;
    }
    return sum;
  }

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.productsAmmount = this.cartService.getProducts();
    this.products = Array.from(this.cartService.getProducts().keys());
  }

  priceToString(price: number): string {
    let result = String(price);
    let i = 3;
    while (result.length > i) {
      result = result.slice(0, result.length - i) + ' ' + result.slice(result.length - i);
      i += 4;
    }
    return result;
  }

}
