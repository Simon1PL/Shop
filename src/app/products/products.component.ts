import { Component, OnInit, Input } from '@angular/core';
import { Product, productType } from '../models/product';
import { ProductsService } from '../services/products-service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  products: Product[] = [];
  visibleProducts: Product[] = [];

  constructor(private productsService: ProductsService, private firebaseService: FirebaseService) { }

  async ngOnInit() {
    await this.productsService.hasLoaded;
    this.getProducts();
    this.visibleProducts = this.products;
  }

  search(event) {
    const searchingValue = event.target.value;
    let resultProducts: Product[];
    // jeszcze dodac szukanie po elementach innych niz nazwa i elementach z additionalSpecification
    if (searchingValue !== '') {
      resultProducts = this.products.filter(product => product.model.toLowerCase().includes(event.target.value.toLowerCase()));
      this.products.forEach(element => {
        if (resultProducts.indexOf(element) < 0 && element.additionalSpecification.toString().toLowerCase().includes(searchingValue)) {
          resultProducts.push(element);
        }
      });
      this.visibleProducts = resultProducts;
      return;
    }
    this.visibleProducts = this.products;
  }

  remove(product: Product) {
    this.productsService.deleteProduct(product);
  }

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

  changeFormVisible() {
    this.productsService.changeFormVisible();
  }

  getFormVisible() {
    return this.productsService.getFormVisible();
  }

}
