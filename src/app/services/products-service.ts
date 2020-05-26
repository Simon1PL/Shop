import { Injectable } from '@angular/core';
import { Product, productType } from '../models/product';
import { bikes as bikesStorage, scooters as scootersStorage } from '../storage/fake-products';
import { Bike } from '../models/bike';
import { Scooter } from '../models/scooter';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  bikes: Bike[] = bikesStorage;
  scooters: Scooter[] = scootersStorage;
  products: Product[] = [...this.bikes, ...this.scooters];

  isBike(product: Bike | Scooter): product is Bike {
    return product.instanceOf === productType.Bike;
  }

  isScooter(product: Bike | Scooter): product is Scooter {
    return product.instanceOf === productType.Scooter;
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(): Product { return this.products[0]; } // which product it should return? TO DO

  addProduct(product: Bike | Scooter): void {
    this.products.push(product);
    if (this.isBike(product)) {
      this.bikes.push(product);
    }
    else {
      this.scooters.push(product);
    }
  }

  deleteProduct(product: Bike | Scooter): void {
    // const index = this.products.indexOf(product);
    // if (index > -1) {
    //   this.products.splice(index, 1);
    // }
    this.products.splice(this.products.indexOf(product), 1);
    if (this.isBike(product)) {
      this.bikes.splice(this.bikes.indexOf(product));
    }
    else {
      this.scooters.splice(this.scooters.indexOf(product));
    }
  }

  constructor() { }
}
