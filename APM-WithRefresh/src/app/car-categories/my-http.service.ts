import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarCategory } from './car-category';
import { Car } from '../cars/car';
import { Supplier } from '../suppliers/supplier';
import { Toy } from '../toys/toy';
import { ToyCategory } from '../toy-categories/toy-category';

@Injectable({
  providedIn: 'root'
})
export class MyHttpService {
  private carCategoriesUrl = 'api/carCategories';
  private carsUrl = 'api/cars';
  private suppliersUrl = 'api/suppliers';
  private toysUrl = 'api/toys';
  private toyCategoriesUrl = 'api/toyCategories';

  constructor(private http: HttpClient) {
  }

  getCategories() {
    return this.http.get<CarCategory[]>(this.carCategoriesUrl);
  }

  getCars() {
    return this.http.get<Car[]>(this.carsUrl);
  }

  getSupplierById(id) {
    return this.http.get<Supplier>(`${this.suppliersUrl}/${id}`);
  }

  getSuppliers() {
    return this.http.get<Supplier[]>(this.suppliersUrl);
  }

  getToys() {
    return this.http.get<Toy[]>(this.toysUrl);
  }

  getToyCategories() {
    return this.http.get<ToyCategory[]>(this.toyCategoriesUrl);
  }

}
