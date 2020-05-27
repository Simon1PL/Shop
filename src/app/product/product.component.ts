import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Product, productType } from '../models/product';
import { ProductsService } from '../services/products-service';
import { Bike } from '../models/bike';
import { Scooter } from '../models/scooter';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductsService]
})

export class ProductComponent implements OnInit {
  @Input()
  product: Product;
  @Input()
  notAllInfo = false;
  @Output()
  removeEmiter = new EventEmitter<string>();
  productSpecification: [string, string][];
  inCart: number;
  productType = productType;
  photoDisplay = false;

  remove(product) {
    this.removeEmiter.emit(product);
  }

  addToCart(event: MouseEvent, ilosc: number) {
    if ((event.target as HTMLInputElement).classList.contains('disabled')) { return; }
    if (this.inCart + ilosc > this.product.inStock) {
      this.inCart = this.product.inStock;
    }
    if (this.inCart + ilosc <= 0) {
      this.inCart = 0;
    }
    else { this.inCart += ilosc; }
    if (this.inCart > 0) { this.cartService.addProduct(this.product, this.inCart); }
    else { this.cartService.deleteProduct(this.product); }
  }

  constructor(private productsService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
    const ammount = this.cartService.getProductAmmount(this.product);
    this.inCart = ammount > 0 ? ammount : 0;
    if (this.product.instanceOf === productType.Bike) {
      this.productSpecification = [
        ['Typ roweru', (this.product as Bike).type],
        ['Rozmiar ramy', (this.product as Bike).frameSize.join(', ')],
        ['Rozmiar kół', (this.product as Bike).wheelDiameter + '"'],
        ...this.product.additionalSpecification];
    }
    if (this.product.instanceOf === productType.Scooter) {
      this.productSpecification = [
        ['Maksymalny zasięg', (this.product as Scooter).maxDistanceKm + ' km'],
        ['Waga', (this.product as Scooter).weightKg + ' kg'],
        ...this.product.additionalSpecification];
    }
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

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    if (this.photoDisplay) {
      const elemen = ev.key;
      if (elemen === 'Escape') {
        this.photoDisplay = false;
      }
    }
  }

}
