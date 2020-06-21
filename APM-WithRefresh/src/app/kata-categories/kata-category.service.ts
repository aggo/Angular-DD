import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KataCategoryService {
  private kataCategoriesUrl = 'api/kataCategories';


  constructor() {
  }
}
