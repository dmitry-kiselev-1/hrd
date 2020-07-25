import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { expirationDateValidator } from '../../../validators/expiration-date.validator';
import { ProductsService } from '../../../services/products/products.service';
import { Category, Product } from '../../../services/products/models';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  updateMode = false;

  formGroup: FormGroup;
  private categories: Category[] = [];
  private product: Product;
  private routeProductId: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productsService: ProductsService) { }

  ngOnInit() {
    this.createForm();
    this.categories = this.productsService.getCategories();

    const snapshot = this.activatedRoute.snapshot;
    if (snapshot.routeConfig.path === 'update/:id') {
      this.updateMode = true;
      this.routeProductId = +snapshot.paramMap.get('id');
      this.fillForm(this.routeProductId);
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({

      name: ['', Validators.compose(
        [Validators.required, Validators.maxLength(200)])],

      rating: ['', Validators.compose(
        [Validators.required, Validators.min(0), Validators.max(10)])],

      brand: [''],

      categories: ['', Validators.compose(
        [Validators.required, Validators.min(1), Validators.maxLength(5)])],

      expirationDate: ['', Validators.compose(
        [expirationDateValidator(30)])],
    });
  }

  fillForm(productId: number) {
    const product = this.productsService.getProduct({id: productId} as Product);

    this.formGroup.controls.name.setValue(product.name);
    this.formGroup.controls.rating.setValue(product.rating);
    this.formGroup.controls.brand.setValue(product.brand);
    this.formGroup.controls.categories.setValue(product.categories);
    this.formGroup.controls.expirationDate.setValue(
      moment(product.expirationDate).format('YYYY-MM-DD'));
  }

  onSubmit() {
    this.product = { ...this.formGroup.value } as Product;
    this.product.featured = this.product.rating > 8 ? true : false;

    // date format processing:
    if (!this.product.expirationDate) {
      delete this.product.expirationDate;
    } else {
      this.product.expirationDate = moment(this.product.expirationDate).toDate();
    }

    // date format processing:
    if (!this.product.createdAt) {
      this.product.createdAt = moment().toDate();
    }

    console.log(this.product);

    if (this.updateMode) {
      this.product.id = this.routeProductId;
      this.productsService.updateProduct(this.product);
    } else {
      this.productsService.createProduct(this.product);
    }

    this.router.navigate(['/']);
  }
}
