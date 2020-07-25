import { Injectable } from '@angular/core';
import { Category, Product } from './models';
import * as _ from 'lodash';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private categories: Category[] = [];

  constructor() {
    this.initMockedProducts();
  }

  public getProducts(): Product[] {
    return this.products;
  }

  public getCategories(): Category[] {
    return this.categories;
  }

  public getProduct(product: Product): Product {
    return _.find(this.products, { id: product.id });
  }

  public createProduct(product: Product): number {
    const nextId = _.maxBy(this.products, 'id').id + 1;
    product.id = nextId;
    this.products.push(product);
    return nextId;
  }

  public removeProduct(product: Product) {
    _.remove(this.products, n => n.id === product.id);
  }

  public updateProduct(product: Product) {
    this.removeProduct(product);
    this.products.push(product);
  }

  private initMockedProducts(): void {
    const todayDate = new Date();

    const nextMonthDate = new Date();
    nextMonthDate.setDate(todayDate.getDate() + 31);

    const mockedCategories: Category[] = [
      {
        id: 1,
        name: 'TV & Home Cinema',
      },
      {
        id: 2,
        name: 'Laptops',
      },
      {
        id: 3,
        name: 'Watches',
      },
      {
        id: 4,
        name: 'Headphones',
      },
      {
        id: 5,
        name: 'Phones',
      },
      {
        id: 6,
        name: 'Desktops',
      },
      {
        id: 7,
        name: 'Monitors',
      },
      {
        id: 8,
        name: 'Printers',
      },
      {
        id: 9,
        name: 'Monitors',
      },
      {
        id: 10,
        name: 'Camera & Photo',
      },
      {
        id: 11,
        name: 'Audio & HiFi',
      },
    ];

    const mockedProducts: Product[] = [
      {
        id: 1,
        name: 'Samsung Galaxy S8',
        rating: 7,
        featured: false,
        brand: 'Samsung',
        categories: [5, 10, 11],
        createdAt: todayDate,
      },
      {
        id: 2,
        name: 'Motorola Moto X',
        rating: 4,
        featured: false,
        brand: 'Motorola',
        categories: [5, 11],
        createdAt: todayDate,
      },
      {
        id: 3,
        name: 'Apple iPhone X',
        rating: 8,
        featured: true,
        brand: 'Apple',
        categories: [5, 11],
        createdAt: todayDate,
      },
      {
        id: 4,
        name: 'Samsung Galaxy S9+',
        rating: 4,
        featured: false,
        brand: 'Samsung',
        categories: [5, 10],
        expirationDate: nextMonthDate,
        createdAt: todayDate,
      },
      {
        id: 5,
        name: 'Google Pixel 3a XL',
        rating: 9,
        featured: true,
        brand: 'Google',
        categories: [5, 10],
        expirationDate: nextMonthDate,
        createdAt: todayDate,
      },
      {
        id: 6,
        name: 'ASUS ZenFone Max',
        rating: 6,
        featured: false,
        brand: 'ASUS',
        categories: [5],
        createdAt: todayDate,
      },
    ];

    this.categories.push(...mockedCategories);
    this.products.push(...mockedProducts);
  }
}
