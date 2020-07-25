import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NoContentComponent } from './components/no-content';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product', children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ProductListComponent },
      { path: 'create', component: ProductFormComponent },
      { path: 'update/:id', component: ProductFormComponent },
    ]},
  { path: '**', component: NoContentComponent },
];
