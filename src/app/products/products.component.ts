import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../services/products-service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  extremumColor(product: Product) {
    if (product.priceInPln === Math.min(...this.products.map(bicycle => bicycle.priceInPln))) {
      return 'red';
    }
    if (product.priceInPln === Math.max(...this.products.map(bicycle => bicycle.priceInPln))) {
      return 'rgb(0, 165, 0)';
    }
  }

  getProducts(): void {
    this.products = this.productsService.getProducts();
  }

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

}
