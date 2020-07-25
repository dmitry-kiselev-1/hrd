import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NoContentComponent } from './components/no-content';
import { ProductsService } from './services/products/products.service';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NoContentComponent,
    HomeComponent,
    ProductListComponent,
    ProductFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    ProductsService,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
