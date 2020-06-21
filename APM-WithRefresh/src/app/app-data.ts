import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ProductData } from './products/product-data';
import { ProductCategoryData } from './product-categories/product-category-data';
import { SupplierData } from './suppliers/supplier-data';
import { CarData } from './cars/car-data';
import { CarCategoryData } from './car-categories/car-category-data';

export class AppData implements InMemoryDbService {

  createDb() {
    const products = ProductData.products;
    const productCategories = ProductCategoryData.categories;
    const suppliers = SupplierData.suppliers;
    const cars = CarData.cars;
    const carCategories = CarCategoryData.categories;

    return {products, productCategories, suppliers, cars, carCategories};
  }
}
