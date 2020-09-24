import { Component } from '@angular/core';
import { ProductsService } from './services/products-service';
import { productType } from './models/product';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'sklep';
  productType = productType;

  constructor(private productService: ProductsService, router: Router, private loginService: LoginService) {
    // router.navigate(['/products']);
  }

  setTypeOfProducts(type: productType) {
    this.productService.specifyProducts = type;
  }

  logout(){}
}
