import { Component } from '@angular/core';
import { ProductsService } from './services/products-service';
import { productType } from './models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'sklep';
  productType = productType;

  setTypeOfProducts(type: productType) {
    this.productService.specifyProducts = type;
  }

  constructor(private productService: ProductsService, router: Router) {
    router.navigate(['/products']);
  }
}
