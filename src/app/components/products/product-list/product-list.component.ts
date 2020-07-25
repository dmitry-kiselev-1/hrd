import { Component, OnInit } from '@angular/core';
import { Product } from '../../../services/products/models';
import { ProductsService } from '../../../services/products/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public products: Product[];

  constructor(
    private productsService: ProductsService,
  ) {}

  public ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  public removeProduct(product: Product) {
   this.productsService.removeProduct(product);
  }
}
