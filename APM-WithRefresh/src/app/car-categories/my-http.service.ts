import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarCategory } from './car-category';
import { Car } from '../cars/car';

@Injectable({
  providedIn: 'root'
})
export class MyHttpService {
  private carCategoriesUrl = 'api/carCategories';
  private carsUrl = 'api/cars';

  constructor(private http: HttpClient) {
  }

  getCategories() {
    return this.http.get<CarCategory[]>(this.carCategoriesUrl);
  }

  getCars() {
    return this.http.get<Car[]>(this.carsUrl);
  }


}
