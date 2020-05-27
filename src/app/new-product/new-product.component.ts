import { Component, OnInit, HostListener } from '@angular/core';
import { Bike, bikeType } from '../models/bike';
import { productType, Product } from '../models/product';
import { Scooter } from '../models/scooter';
import { ProductsService } from '../services/products-service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  warningText = '';
  warningText2 = '';
  newProduct: Product =  { model: '', priceInPln: 0, additionalSpecification: [], photoUrl: 'http://www.stratywojenne.muzeum.bydgoszcz.pl/wp-content/themes/SWMuzeo/img/noimg.png', inStock: 0, instanceOf: productType.Bike };
  // tslint:disable-next-line: max-line-length
  newScooter: Scooter = { model: null, priceInPln: null, additionalSpecification: null, photoUrl: null, inStock: null, instanceOf: null, maxDistanceKm: null, weightKg: null };
  // tslint:disable-next-line: max-line-length
  newBike: Bike = { model: null, priceInPln: null, additionalSpecification: null, photoUrl: null, inStock: null, instanceOf: null, type: null, frameSize: [], wheelDiameter: null};
  productType = productType;

  addModel() {
    this.warningText = '';
    this.warningText2 = '';
    if (this.newProduct.model === '') {
      this.warningText === '' ? this.warningText += 'Uzupełnij: nazwe modelu' : this.warningText += ', nazwe modelu';
      return;
    }
    if (this.newProduct.instanceOf === productType.Bike) {
      if (this.newBike.wheelDiameter === null) {
        this.warningText === '' ? this.warningText += 'Uzupełnij: średnice koła' : this.warningText += ', średnice koła';
        return;
      }
      if (this.newBike.frameSize.length === 0) {
        this.warningText === '' ? this.warningText += 'Uzupełnij: rozmiar ramy' : this.warningText += ', rozmiar ramy';
        return;
      }
      if (this.newBike.type === null) {
        this.warningText === '' ? this.warningText += 'Uzupełnij: typ roweru' : this.warningText += ', typ roweru';
        return;
      }
      this.newBike = { model: this.newProduct.model,
        priceInPln: this.newProduct.priceInPln, instanceOf: this.newProduct.instanceOf,
        additionalSpecification: this.newProduct.additionalSpecification,
        photoUrl: this.newProduct.photoUrl, inStock: this.newProduct.inStock,
        type: this.newBike.type, frameSize:  this.newBike.frameSize,
        wheelDiameter: this.newBike.wheelDiameter };
      this.productsService.addProduct(this.newBike);
    }
    else if (this.newProduct.instanceOf === productType.Scooter) {
      if (this.newScooter.maxDistanceKm === null) {
        this.warningText === '' ? this.warningText += 'Uzupełnij: maksymalny zasięg' : this.warningText += ', maksymalny zasięg';
        return;
      }
      if (this.newScooter.weightKg === null) {
        this.warningText === '' ? this.warningText += 'Uzupełnij: wagę' : this.warningText += ', wagę';
        return;
      }
      this.newScooter = { model: this.newProduct.model,
        priceInPln: this.newProduct.priceInPln, instanceOf: this.newProduct.instanceOf,
        additionalSpecification: this.newProduct.additionalSpecification,
        photoUrl: this.newProduct.photoUrl, inStock: this.newProduct.inStock,
      maxDistanceKm: this.newScooter.maxDistanceKm, weightKg: this.newScooter.weightKg };
      this.productsService.addProduct(this.newScooter);
    }
    this.productsService.changeFormVisible();
    document.getElementById('infoAdded').style.visibility = 'visible';
    document.getElementById('infoAdded').style.opacity = '1';
    setTimeout(() => {
      document.getElementById('infoAdded').style.opacity = '0';
      setTimeout(() => {
        document.getElementById('infoAdded').style.visibility = 'hidden';
      }, 200);
    }, 1000);
  }

  addSpecification(left: string, right: string) {
    this.warningText = '';
    this.warningText2 = '';
    if (left === '' || right === '') {
      this.warningText2 === '' ? this.warningText2 += 'Uzupełnij: część oraz jej model/opis' : this.warningText2 += ', część oraz jej model/opis';
      return;
    }
    this.newProduct.additionalSpecification.push([left, right]);
  }

  setPrice(priceInputEvent: InputEvent): void {
    const price = Number((priceInputEvent.target as HTMLInputElement).value);
    if (price >= 0) {
      this.newProduct.priceInPln = price;
    }
  }

  setAmmount(ammountInputEvent: InputEvent): void {
    const ammount = Number((ammountInputEvent.target as HTMLInputElement).value);
    if (ammount >= 0) {
      this.newProduct.inStock = ammount;
    }
  }

  addNewFrameSize(event) {
    if (this.newBike.frameSize.indexOf(event.target.value) < 0) {
      this.newBike.frameSize.push(event.target.value);
    }
  }

  addNewBikeType(event) {
    this.newBike.type = event.target.value;
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    if (this.productsService.getFormVisible()) {
      const elemen = ev.key;
      const left = document.getElementById('left');
      const right = document.getElementById('right');
      if (elemen === 'Enter') {
        console.log(ev.target);
        if (ev.target === left || ev.target === right) {
          this.addSpecification((left as HTMLInputElement).value, (right as HTMLInputElement).value);
        }
        else { this.addModel(); }
        return;
      }
      if (elemen === 'Escape') {
        this.productsService.changeFormVisible();
      }
    }
  }

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
  }

}
