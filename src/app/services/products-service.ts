import { Injectable } from '@angular/core';
import { Product, productType } from '../models/product';
import { bikes as bikesStorage } from '../storage/fake-products';
import { scooters as scootersStorage } from '../storage/fake-scooters';
import { Bike } from '../models/bike';
import { Scooter } from '../models/scooter';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  bikes: Bike[]; // = bikesStorage;
  scooters: Scooter[]; // = scootersStorage;
  products: Product[]; // = [...this.bikes, ...this.scooters];
  formVisible = false;
  specifyProducts: productType;
  public hasLoaded: Promise<void>;

  changeFormVisible() {
    this.formVisible = !this.formVisible;
  }

  getFormVisible() {
    return this.formVisible;
  }

  getProducts(): Product[] {
    if (this.specifyProducts === productType.Scooter) { return this.getScooters(); }
    if (this.specifyProducts === productType.Bike) { return this.getBikes(); }
    return this.products;
  }

  getBikes(): Bike[] {
    return this.bikes;
  }

  getScooters(): Scooter[] {
    return this.scooters;
  }

  getProduct(i: number): Product {
    return i < this.products.length ? this.products[i] : null;
  }

  addProduct(product: Product): void {
    this.firebaseService.addProduct(product);
    this.products.push(product);
    if (product.instanceOf === productType.Bike) {
      this.bikes.push(product as Bike);
    }
    else if (product.instanceOf === productType.Scooter) {
      this.scooters.push(product as Scooter);
    }
  }

  deleteProduct(product: Product): void {
    // const index = this.products.indexOf(product);
    // if (index > -1) {
    //   this.products.splice(index, 1);
    // }
    this.firebaseService.deleteProduct(product.id);
    this.products.splice(this.products.indexOf(product), 1);
    if (product.instanceOf === 0) {
      this.bikes.splice(this.bikes.indexOf(product as Bike), 1);
    }
    else if (product.instanceOf === 1) {
      this.scooters.splice(this.scooters.indexOf(product as Scooter), 1);
    }
  }

  loadData() {
    return this.firebaseService.getProducts().then(res => {
      this.products = res as Product[];
      this.products.forEach(p => p.additionalSpecification = p.additionalSpecification ? p.additionalSpecification : []);
      this.scooters = this.products.filter(p => p.instanceOf === productType.Scooter) as Scooter[];
      this.bikes = this.products.filter(p => p.instanceOf === productType.Bike) as Bike[];
    });
  }

  constructor(private firebaseService: FirebaseService) {
    this.hasLoaded = new Promise((resolve, reject) => {
      this.loadData().then(value => resolve(value)); });
   }
}
