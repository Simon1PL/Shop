import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) {
  }

  async getStarted() {
    let products: Product[];
    await this.getProducts().then(res => {
        products = res as Product[];
    });
    return products;
  }

  getProducts() {
    return new Promise((resolve, reject) => {
      this.db.list('products').valueChanges().subscribe(value => resolve(value));
    });
  }

  addProduct(prod: Product){
    prod.id = this.db.list('products').push(prod).key;
    this.updateProduct(prod);
  }

  updateProduct(prod: Product){
    this.db.object('products/' + prod.id).update(prod);
  }

  deleteProduct(prodID: string){
    this.db.object('products/' + prodID).remove();
  }

}
