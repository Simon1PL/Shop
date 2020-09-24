import { Component } from '@angular/core';
import { ProductsService } from './services/products-service';
import { productType, Product } from './models/product';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { User, roleEnum } from './models/user';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'sklep';
  productType = productType;
  user: User;
  displayUser: string;

  constructor(private productService: ProductsService, private firebaseService: FirebaseService, private loginService: LoginService) {
    this.loginService.currentUser().subscribe(data => {
      if (data == null) {
        this.user = null;
        this.displayUser = null;
      }
      else {
        this.user = (data as User);
        this.displayUser = this.user.email.slice(0, this.user.email.indexOf('@'));
        this.firebaseService.getUser(this.user.email).then(user => { this.user = (user as User); })
        .catch(err => alert(err));
      }
    });
  }

  setTypeOfProducts(type: productType) {
    this.productService.specifyProducts = type;
  }

  logout(){
    this.user = null;
    this.displayUser = null;
    this.loginService.logout();
  }
}
