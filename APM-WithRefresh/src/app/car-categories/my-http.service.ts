import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarCategory } from './car-category';

@Injectable({
  providedIn: 'root'
})
export class MyHttpService {
  private carCategoriesUrl = 'api/carCategories';

  constructor(private http: HttpClient) {
  }

  getCategories() {
    return this.http.get<CarCategory[]>(this.carCategoriesUrl);
  }

}
