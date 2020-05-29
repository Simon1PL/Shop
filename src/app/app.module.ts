import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SearchPipe } from './search.pipe';
import { ProductsService } from './services/products-service';
import { PhotoComponent } from './photo/photo.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent,
    NewProductComponent,
    ShoppingCartComponent,
    SearchPipe,
    PhotoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
