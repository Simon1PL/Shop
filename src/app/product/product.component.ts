import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../services/products-service';
import { Bike } from '../models/bike';
import { Scooter } from '../models/scooter';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input()
  product: Product;
  @Output()
  bikeEvent = new EventEmitter<string>();

  productSpecification: [string, string][];
  iloscWKoszyku = 0;

  usun(product) {
    this.bikeEvent.emit(product);
  }

  constructor(private productsService: ProductsService) { }

 dodaj(event: MouseEvent, ilosc: number) {
    if ((event.target as HTMLInputElement).classList.contains('disabled')) { return; }
    if (this.iloscWKoszyku + ilosc > this.product.inStock) {
      this.iloscWKoszyku = this.product.inStock;
      return;
    }
    if (this.iloscWKoszyku + ilosc < 0) {
      this.iloscWKoszyku = 0;
      return;
    }
    this.iloscWKoszyku += ilosc;
  }

  ngOnInit(): void {
    if (this.productsService.isBike(this.product as Bike)) {console.log('YES'); }
    this.productSpecification = [...this.product.additionalSpecification, ];
  }

  cenaToString(cena: number): string {
    let result = String(cena);
    let i = 3;
    while (result.length > i) {
      result = result.slice(0, result.length - i) + ' ' + result.slice(result.length - i);
      i += 4;
    }
    return result;
  }

}
